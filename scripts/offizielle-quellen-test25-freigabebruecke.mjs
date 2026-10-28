// TEST25: Evidence reconciliation. Read-only; no promotions to TEST18/19/20 without an official browser tuple.
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const complete=t=>t&&typeof t.datum==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(t.datum)&& !Number.isNaN(Date.parse(t.datum+'T12:00:00Z'))&&typeof t.anstoss==='string'&&/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(t.anstoss);
const eq=(a,b)=>a.datum===b.datum&&a.anstoss===b.anstoss;
function need(ok,why){if(!ok)throw Error(why);}
export function reconcile({data,config,browser,monitor,audit,detail}){
 need(data&&Array.isArray(data.saisons)&&Array.isArray(config?.quellen),'DATEN_ODER_KONFIGURATION_FEHLT');
 need(browser?.automatischeAenderung===false&&Array.isArray(browser.befunde),'BROWSER_KEIN_READONLY_BERICHT');
 need(monitor?.automatischeAenderung===false&&Array.isArray(monitor.spiele),'MONITOR_KEIN_READONLY_BERICHT');
 need(audit?.automatischeAenderung===false&&Array.isArray(audit.spiele),'TEST24_KEIN_READONLY_BERICHT');
 need(detail?.automatischeAenderung===false&&Array.isArray(detail.spiele),'TEST23_KEIN_READONLY_BERICHT');
 need(browser.datenVersion===data.datenVersion,'DATENVERSION_WIDERSPRUCH');
 const games=data.saisons.flatMap(s=>s.spiele||[]), byId=new Map(games.map(x=>[x.id,x]));need(byId.size===games.length,'DOPPELTE_SPIEL_ID');
 const assigned=config.quellen.flatMap(q=>(q.spielIds||[]).map(id=>id));need(assigned.length===new Set(assigned).size,'DOPPELTE_ZUORDNUNG');
 const browserMap=new Map(browser.befunde.map(x=>[x.spielId,x]));need(browserMap.size===browser.befunde.length,'BROWSER_DOPPELBEFUNDE');
 const monitorMap=new Map(monitor.spiele.map(x=>[x.spielId,x]));
 const auditMap=new Map(audit.spiele.map(x=>[x.spielId,x]));const detailMap=new Map(detail.spiele.map(x=>[x.spielId,x]));
 const rows=[];
 for(const id of assigned){
  const g=byId.get(id), b=browserMap.get(id), m=monitorMap.get(id);
  need(g&&b&&m,'UNVOLLSTAENDIGE_UEBERWACHUNG_'+id);
  need(g.status==='terminiert'&&g.heimtore===null&&g.auswaertstore===null,'NICHT_OFFENES_SPIEL_'+id);
  const current={datum:g.datum,anstoss:g.anstoss};need(complete(current),'BESTANDSTERMIN_UNGUELTIG_'+id);
  need(eq(current,m.websiteBestand),'MONITOR_BESTAND_WIDERSPRUCH_'+id);
  const extra=auditMap.get(id), d=detailMap.get(id);
  if(extra)need(eq(current,extra.websiteBestand)&&extra.automatischFreigabefaehig===false&&extra.bestandUnveraendert===true,'TEST24_BESTAND_ODER_SCHUTZ_WIDERSPRUCH_'+id);
  if(d)need(eq(current,d.websiteBestand)&&d.korrekturFreigabe===false&&d.bestandUnveraendert===true,'TEST23_BESTAND_ODER_SCHUTZ_WIDERSPRUCH_'+id);
  const official=['IDENTISCH','ABWEICHUNG'].includes(b.status)&&complete(b.amtlich);
  if(['IDENTISCH','ABWEICHUNG'].includes(b.status))need(official,'OFFIZIELLER_TERMIN_UNVOLLSTAENDIG_'+id);
  if(b.status==='IDENTISCH')need(eq(current,b.amtlich),'IDENTISCH_UNWAHR_'+id);
  if(b.status==='ABWEICHUNG')need(complete(b.bisher)&&eq(current,b.bisher)&&!eq(current,b.amtlich),'ABWEICHUNG_WIDERSPRUCH_'+id);
  const detailDate=extra?.quellenTermin, possible=d?.moeglicherNeuerTermin;
  const additional=[detailDate,possible].filter(complete);
  const conflict=official&&additional.some(t=>!eq(t,b.amtlich));
  // Only the existing verified official browser pipeline can propose a change. Supplemental information may veto, never grant.
  const state=conflict?'QUELLENKONFLIKT_MANUELLE_PRUEFUNG':b.status==='ABWEICHUNG'?'BROWSER_BESTAETIGT_KORREKTUR_NUR_NACH_FREIGABE':b.status==='IDENTISCH'?'AMTLICH_IDENTISCH':'WEITER_UEBERWACHEN_BESTAND_BLEIBT';
  const correctable=state==='BROWSER_BESTAETIGT_KORREKTUR_NUR_NACH_FREIGABE';
  rows.push({spielId:id,websiteBestand:current,browserStatus:b.status,zusaetzlicheQuellen:additional.length,amtlicherTermin:official?{datum:b.amtlich.datum,anstoss:b.amtlich.anstoss}:null,status:state,korrekturZurManuellenPruefung:correctable,automatischeAenderung:false});
 }
 need(rows.length===monitor.spiele.length&&monitor.spiele.every(m=>assigned.includes(m.spielId)),'UEBERWACHUNG_ABDECKUNG_WIDERSPRUCH');
 return {schema:'TEST25',modus:'READ_ONLY_QUELLENBRUECKE',datenVersion:data.datenVersion,anzahl:{ueberwacht:rows.length,offen:rows.filter(x=>x.status==='WEITER_UEBERWACHEN_BESTAND_BLEIBT').length,identisch:rows.filter(x=>x.status==='AMTLICH_IDENTISCH').length,korrekturZurManuellenPruefung:rows.filter(x=>x.korrekturZurManuellenPruefung).length,konflikte:rows.filter(x=>x.status==='QUELLENKONFLIKT_MANUELLE_PRUEFUNG').length},automatischeAenderung:false,automatischeGitAenderung:false,liveFreigabe:false,spiele:rows};
}
export function run({root='.',reportDir='terminwaechter-bericht'}={}){
 const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
 const report=p=>JSON.parse(fs.readFileSync(path.join(reportDir,p),'utf8'));
 const result=reconcile({data:read('spieldaten.json'),config:read('terminwaechter/offizielle-quellen.json'),browser:report('BROWSER_QUELLEN_BERICHT.json'),monitor:report('TEST22_UEBERWACHUNG.json'),audit:report('TEST24_QUELLENABGLEICH.json'),detail:report('TEST23_QUELLENSTATUS.json')});
 fs.mkdirSync(reportDir,{recursive:true});fs.writeFileSync(path.join(reportDir,'TEST25_QUELLENBRUECKE.json'),JSON.stringify(result,null,2)+'\n');
 const lines=['# TEST25 – Quellenbrücke (READ ONLY)','',`Überwacht: ${result.anzahl.ueberwacht}; unverifiziert: ${result.anzahl.offen}; identisch: ${result.anzahl.identisch}; Änderungen zur manuellen Prüfung: ${result.anzahl.korrekturZurManuellenPruefung}; Konflikte: ${result.anzahl.konflikte}`,'',...result.spiele.map(x=>`- ${x.spielId}: ${x.status}; Website ${x.websiteBestand.datum} ${x.websiteBestand.anstoss}`),'','Nur offizielle Browserbestätigung darf eine Prüfung anregen. Hinweise aus TEST23/24 können blockieren, nicht freigeben.','Keine Änderung an Spieldaten, kein Commit, kein LIVE.'];
 fs.writeFileSync(path.join(reportDir,'TEST25_QUELLENBRUECKE.md'),lines.join('\n')+'\n');console.log('TEST25:',JSON.stringify(result.anzahl));return result;
}
if(process.argv[1]&&pathToFileURL(path.resolve(process.argv[1])).href===import.meta.url){try{run({root:process.env.TOSMC_ROOT||'.',reportDir:process.env.TOSMC_OFFICIAL_OUT||'terminwaechter-bericht'});}catch(e){console.error('TEST25 FEHLER:',e.message);process.exitCode=1;}}
