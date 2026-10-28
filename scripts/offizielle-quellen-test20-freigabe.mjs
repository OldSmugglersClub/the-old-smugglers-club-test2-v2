// TEST20 – guarded preparation of a TEST2v2-only replacement file.
// Does NOT modify tracked files, git, LIVE, or any website.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {buildCandidate} from './offizielle-quellen-test19-vorschau.mjs';
const sha = x=>crypto.createHash('sha256').update(x).digest('hex');
function check(ok,msg){if(!ok)throw Error(msg);}
export function prepare({source,manifest,proposal,status,approval='',expectedHash='',event='workflow_dispatch'}={}){
 const src=JSON.parse(source),m=JSON.parse(manifest);
 check(m.schema==='TEST19'&&m.modus==='VORSCHAU_NICHT_EINSPIELEN'&&m.automatischeAenderung===false&&m.freigabe==='KEINE_FREIGABE','TEST19_MANIFEST_UNZULAESSIG');
 check(m.quelleHashSHA256===sha(source),'BESTAND_SEIT_TEST19_VERAENDERT');
 const built=buildCandidate(source,proposal,status);
 check(sha(built.candidate)===m.kandidatHashSHA256&&built.manifest.quelleHashSHA256===m.quelleHashSHA256,'KANDIDAT_WIDERSPRUCH');
 check(JSON.stringify(built.manifest.aenderungen)===JSON.stringify(m.aenderungen),'AENDERUNGSLISTE_WIDERSPRUCH');
 check(m.anzahlAenderungen===built.manifest.anzahlAenderungen&&m.datenVersion===src.datenVersion,'MANIFEST_UMFANG_WIDERSPRUCH');
 const allowed=(event==='workflow_dispatch'&&approval==='TEST2V2_FREIGABE'&&expectedHash===m.quelleHashSHA256&&m.anzahlAenderungen>0);
 const result={schema:'TEST20',modus:'NUR_TEST2V2_MANUELLE_FREIGABE',freigabe:allowed?'MANUELL_FUER_TEST2V2_FREIGEGEBEN':'NICHT_FREIGEGEBEN',auslieferung:allowed?'DATEI_FUER_MANUELLES_TEST2V2_EINSPIELEN':'KEINE_DATEI',event,quelleHashSHA256:m.quelleHashSHA256,kandidatHashSHA256:m.kandidatHashSHA256,anzahlAenderungen:m.anzahlAenderungen,automatischeGitAenderung:false,automatischeWebsiteAenderung:false,liveFreigabe:false};
 return {result,candidate:allowed?built.candidate:null};
}
export function run({root='.',reportDir='terminwaechter-bericht',event=process.env.GITHUB_EVENT_NAME||'workflow_dispatch',approval=process.env.TEST20_APPROVAL||'',expectedHash=process.env.TEST20_SOURCE_SHA||''}={}){
 const read=p=>fs.readFileSync(path.join(root,p),'utf8');
 const source=read('spieldaten.json');
 const report=p=>fs.readFileSync(path.join(reportDir,p),'utf8');
 const {result,candidate}=prepare({source,manifest:report('TEST19_MANIFEST.json'),proposal:report('TEST18_KORREKTURVORSCHLAEGE.json'),status:report('TEST18_STATUS.json'),event,approval,expectedHash});
 fs.mkdirSync(reportDir,{recursive:true});
 fs.writeFileSync(path.join(reportDir,'TEST20_STATUS.json'),JSON.stringify(result,null,2)+'\n');
 const release=path.join(reportDir,'TEST20_NUR_NACH_MANUELLER_FREIGABE_TEST2V2');
 if(candidate){fs.mkdirSync(release,{recursive:true});fs.writeFileSync(path.join(release,'spieldaten.json'),candidate);}
 else {fs.rmSync(release,{recursive:true,force:true});}
 fs.writeFileSync(path.join(reportDir,'TEST20_STATUS.md'),['# TEST20 – Kontrollierte Freigabe ausschließlich für TEST2v2','',`Status: ${result.freigabe}`,`Änderungen: ${result.anzahlAenderungen}`,`Quell-SHA256: ${result.quelleHashSHA256}`,`Kandidat-SHA256: ${result.kandidatHashSHA256}`,'','Keine automatische Git-/Website-Änderung. Kein LIVE-Release.','Ein erzeugtes TEST2v2-Austauschfile darf nur nach Prüfung des aktuellen Repository-Diffs von Hand eingespielt werden.'].join('\n')+'\n');
 console.log(`TEST20: ${result.freigabe}; ${result.anzahlAenderungen} Abweichungen; keine automatischen Repository-Änderungen`);
 return result;
}
if(process.argv[1]&&pathToFileURL(path.resolve(process.argv[1])).href===import.meta.url){try{run({root:process.env.TOSMC_ROOT||'.',reportDir:process.env.TOSMC_OFFICIAL_OUT||'terminwaechter-bericht'});}catch(e){console.error('TEST20 SICHERHEITSABBRUCH:',e.message);process.exitCode=1;}}
