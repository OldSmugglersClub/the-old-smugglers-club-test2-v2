// TEST19: produces a guarded REVIEW-ONLY candidate based on current TEST2v2 data.
// Never writes spieldaten.json, never commits, never uploads, never touches LIVE.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

const sha = s => crypto.createHash('sha256').update(s).digest('hex');
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const TIME = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
const FIELDS = ['datum','datumVon','datumBis','datumAnzeige','anstoss'];
const ALLOWED = new Set(['piratenkodex','weihnachtsregatta','europa-league','dfb-pokal']);
const ALLOWED_HOSTS = ['legaseriea.it','premierleague.com'];
function ensure(condition,reason){if(!condition)throw Error(reason);}
function validDate(s){return typeof s==='string'&&DATE.test(s)&&new Date(s+'T12:00:00Z').toISOString().slice(0,10)===s;}
function validTime(s){return typeof s==='string'&&TIME.test(s);}
function allowedSource(raw){try{const u=new URL(raw);return u.protocol==='https:'&&ALLOWED_HOSTS.some(h=>u.hostname===h||u.hostname.endsWith('.'+h));}catch{return false;}}
function updateBlock(source,gameId,before,after){
 const escaped=JSON.stringify(gameId);
 const marker='"id": '+escaped;
 const ix=source.indexOf(marker);
 ensure(ix>=0&&source.indexOf(marker,ix+marker.length)<0,'SPIEL_ID_IM_TEXT_NICHT_EINDEUTIG: '+gameId);
 const start=source.lastIndexOf('        {',ix);
 const end=source.indexOf('\n        }',ix);
 ensure(start>=0&&end>ix,'SPIELBLOCK_NICHT_ERKANNT: '+gameId);
 let block=source.slice(start,end+10);
 ensure(block.includes(marker),'SPIELBLOCK_ID_WIDERSPRUCH');
 const oldDate=before.datum, oldTime=before.anstoss;
 const formatDate=d=>d.slice(8,10)+'.'+d.slice(5,7)+'.'+d.slice(0,4);
 const tuples={datum:[oldDate,after.datum],datumVon:[oldDate,after.datum],datumBis:[oldDate,after.datum],datumAnzeige:[formatDate(oldDate),formatDate(after.datum)],anstoss:[oldTime,after.anstoss]};
 for(const [key,[oldVal,newVal]] of Object.entries(tuples)){
   ensure(before[key]===oldVal,'BESTAND_DATUMSFELDER_NICHT_KONSISTENT: '+gameId+' '+key);
   const oldLine=JSON.stringify(key)+': '+JSON.stringify(oldVal);
   const newLine=JSON.stringify(key)+': '+JSON.stringify(newVal);
   ensure(block.split(oldLine).length===2,'SPIELBLOCK_FELD_NICHT_EINDEUTIG: '+gameId+' '+key);
   block=block.replace(oldLine,newLine);
 }
 return source.slice(0,start)+block+source.slice(end+10);
}
export function buildCandidate(dataRaw, proposalsRaw, statusRaw){
 const data=JSON.parse(dataRaw), proposalDoc=JSON.parse(proposalsRaw), status=JSON.parse(statusRaw);
 ensure(status.schema==='TEST18'&&status.technischerStatus==='OK'&&status.automatischeAenderung===false,'TEST18_STATUS_NICHT_VERTRAUENSWUERDIG');
 ensure(status.datenVersion===data.datenVersion,'DATENVERSION_ABWEICHEND');
 ensure(proposalDoc.schema==='TEST18'&&proposalDoc.automatischeAenderung===false&&proposalDoc.modus==='VORSCHLAEGE_NUR_ZUR_SICHTUNG','TEST18_VORSCHLAEGE_NICHT_VERTRAUENSWUERDIG');
 const proposals=proposalDoc.vorschlaege;
 ensure(Array.isArray(proposals)&&proposals.length>=0&&proposals.length<=25,'VORSCHLAEGE_ANZAHL_NICHT_ERLAUBT');
 ensure(status.anzahl?.abweichungen===proposals.length,'VORSCHLAGSZAHL_WIDERSPRUCH');
 const games=(data.saisons||[]).flatMap(s=>s.spiele||[]);
 const byId=new Map(games.map(g=>[g.id,g]));
 ensure(byId.size===games.length,'DOPPELTE_SPIEL_ID_IM_BESTAND');
 const unique=new Set();
 let output=dataRaw;
 const changes=[];
 for(const entry of proposals){
  const id=entry.spielId;
  ensure(typeof id==='string'&&!unique.has(id),'DOPPELTER_ODER_UNGUELTIGER_VORSCHLAG');unique.add(id);
  const g=byId.get(id);
  ensure(g&&ALLOWED.has(g.wettbewerb)&&g.status==='terminiert'&&g.heimtore===null&&g.auswaertstore===null,'GESCHUETZTES_ODER_FEHLENDES_SPIEL: '+id);
  ensure(entry.automatischAnwenden===false&&entry.freigabe==='MANUELLE_PRUEFUNG_ERFORDERLICH','FREIGABESCHUTZ_FEHLT: '+id);
  ensure(allowedSource(entry.quelle),'QUELLEN_DOMAIN_NICHT_FREIGEGEBEN: '+id);
  const before=entry.bisher,after=entry.vorschlag;
  ensure(validDate(before?.datum)&&validTime(before?.anstoss)&&validDate(after?.datum)&&validTime(after?.anstoss),'UNGUELTIGER_TERMIN: '+id);
  ensure(g.datum===before.datum&&g.anstoss===before.anstoss,'BESTANDSKONFLIKT: '+id);
  ensure(g.datum!==after.datum||g.anstoss!==after.anstoss,'KEINE_ABWEICHUNG: '+id);
  output=updateBlock(output,id,g,after);
  changes.push({spielId:id,wettbewerb:g.wettbewerb,bisher:before,vorschlag:after,quelle:entry.quelle,freigabe:'NICHT_FREIGEGEBEN'});
 }
 const result=JSON.parse(output);
 const finalGames=result.saisons.flatMap(s=>s.spiele||[]);
 ensure(finalGames.length===games.length&&result.datenVersion===data.datenVersion,'DATENBESTAND_GROESSE_ODER_VERSION_VERAENDERT');
 let countChanged=0;
 for(let i=0;i<games.length;i++){
   const a=games[i],b=finalGames[i];
   const changed=Object.keys(a).filter(k=>JSON.stringify(a[k])!==JSON.stringify(b[k]));
   if(changed.length){
    countChanged++;
    ensure(unique.has(a.id)&&changed.every(k=>FIELDS.includes(k)),'UNZULAESSIGE_AENDERUNG: '+a.id);
   }
 }
 ensure(countChanged===proposals.length,'AENDERUNGSANZAHL_WIDERSPRUCH');
 return {candidate:output,manifest:{schema:'TEST19',modus:'VORSCHAU_NICHT_EINSPIELEN',datenVersion:data.datenVersion,quelleHashSHA256:sha(dataRaw),kandidatHashSHA256:sha(output),anzahlAenderungen:changes.length,fachlicherStatus:status.fachlicherStatus,automatischeAenderung:false,freigabe:'KEINE_FREIGABE',aenderungen:changes}};
}
export function run({root='.',reportDir='terminwaechter-bericht'}={}){
 const source=fs.readFileSync(path.join(root,'spieldaten.json'),'utf8');
 const proposals=fs.readFileSync(path.join(reportDir,'TEST18_KORREKTURVORSCHLAEGE.json'),'utf8');
 const status=fs.readFileSync(path.join(reportDir,'TEST18_STATUS.json'),'utf8');
 const {candidate,manifest}=buildCandidate(source,proposals,status);
 // Candidate lives in a deliberately non-deployable subdirectory within the artifact.
 const folder=path.join(reportDir,'TEST19_NICHT_EINSPIELEN');
 if(manifest.anzahlAenderungen>0){fs.mkdirSync(folder,{recursive:true});fs.writeFileSync(path.join(folder,'spieldaten.json'),candidate);}
 else fs.rmSync(folder,{recursive:true,force:true});
 fs.writeFileSync(path.join(reportDir,'TEST19_MANIFEST.json'),JSON.stringify(manifest,null,2)+'\n');
 const lines=['# TEST19 – Korrekturvorschau, NICHT EINSPIELEN','',
 `Datenversion: ${manifest.datenVersion}`,`Bestands-SHA256: ${manifest.quelleHashSHA256}`,`Vorschau-SHA256: ${manifest.kandidatHashSHA256}`,
 `Vorschläge: ${manifest.anzahlAenderungen}`,'','## Manuell zu prüfende Änderungen',
 ...manifest.aenderungen.map(x=>`- ${x.spielId}: ${x.bisher.datum} ${x.bisher.anstoss} → ${x.vorschlag.datum} ${x.vorschlag.anstoss}; ${x.quelle}`),
 '','**KEINE FREIGABE**: Die Datei TEST19_NICHT_EINSPIELEN/spieldaten.json ist ausschließlich eine Vorschau. ',
 'Zur tatsächlichen TEST2v2-Einspielung ist vorher eine gesonderte Freigabe und ein aktueller Bestandsabgleich erforderlich.',
 'LIVE wird niemals automatisch geändert.'];
 fs.writeFileSync(path.join(reportDir,'TEST19_KORREKTURVORSCHAU.md'),lines.join('\n')+'\n');
 console.log('TEST19 Vorschau erstellt:',manifest.anzahlAenderungen,'Änderungen; keine Website-/Repo-Änderung');
 return manifest;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{run({root:process.env.TOSMC_ROOT||'.',reportDir:process.env.TOSMC_OFFICIAL_OUT||'terminwaechter-bericht'});}catch(e){console.error('TEST19 SICHERHEITSABBRUCH:',e.message);process.exitCode=1;}
}
