// TEST27: mandatory artifact and source verification BEFORE any TEST2v2 Draft-PR.
// No filesystem, Git or website write; no LIVE permission.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {validate as validateGate} from './offizielle-quellen-test25-gate.mjs';
import {validate as validatePr,createPr,githubApi} from './offizielle-quellen-test21-pr.mjs';
const hash = s => crypto.createHash('sha256').update(s).digest('hex');
function need(x,s){if(!x)throw Error('TEST27_BLOCKIERT_'+s);}
const match=(a,b)=>a?.datum===b?.datum&&a?.anstoss===b?.anstoss;
export function verifyEvidence({source,reportDir,runId,expectedHash,approval,repository,event}){
  const read=n=>JSON.parse(fs.readFileSync(path.join(reportDir,n),'utf8'));
  const raw=n=>fs.readFileSync(path.join(reportDir,n),'utf8');
  need(hash(source)===expectedHash,'QUELLHASH_WIDERSPRUCH');
  const bridge=read('TEST25_QUELLENBRUECKE.json');
  const proposals=read('TEST18_KORREKTURVORSCHLAEGE.json');
  const test22=read('TEST22_UEBERWACHUNG.json');
  const browser=read('BROWSER_QUELLEN_BERICHT.json');
  const test20=read('TEST20_STATUS.json');
  const test19=read('TEST19_MANIFEST.json');
  need(test22.schema==='TEST22'&&test22.automatischeAenderung===false&&Array.isArray(test22.spiele),'MONITOR_NICHT_VERTRAUENSWUERDIG');
  need(browser.automatischeAenderung===false&&Array.isArray(browser.befunde),'BROWSER_NICHT_VERTRAUENSWUERDIG');
  need(bridge.datenVersion===JSON.parse(source).datenVersion&&test22.anzahl?.ueberwacht===bridge.anzahl?.ueberwacht,'DATENVERSION_ODER_ABDECKUNG');
  need(test20.freigabe==='MANUELL_FUER_TEST2V2_FREIGEGEBEN'&&test20.automatischeGitAenderung===false&&test20.liveFreigabe===false,'TEST20_FREIGABE_FEHLT');
  need(test19.anzahlAenderungen>0&&test19.anzahlAenderungen===proposals.vorschlaege.length,'KEINE_KORREKTUREN');
  validateGate(bridge,proposals);
  const bmap=new Map(browser.befunde.map(x=>[x.spielId,x]));
  need(bmap.size===browser.befunde.length,'DOPPELTE_BROWSER_BEFUNDE');
  const mmap=new Map(test22.spiele.map(x=>[x.spielId,x]));
  need(mmap.size===test22.spiele.length,'DOPPELTE_MONITOR_BEFUNDE');
  for(const p of proposals.vorschlaege){
    const b=bmap.get(p.spielId),m=mmap.get(p.spielId);
    need(b?.status==='ABWEICHUNG'&&match(b.bisher,p.bisher)&&match(b.amtlich,p.vorschlag),'BROWSER_UND_VORSCHLAG_WIDERSPRUCH');
    need(m?.ueberwachung==='AKTIV'&&match(m.websiteBestand,p.bisher)&&match(m.bestaetigterTermin,p.vorschlag),'MONITOR_UND_VORSCHLAG_WIDERSPRUCH');
  }
  const verified=validatePr({source,reportDir,runId,approval,expectedHash,repository,event});
  need(verified.changes.length===proposals.vorschlaege.length,'PR_VORSCHLAG_SUMME_WIDERSPRUCH');
  need(verified.candidateHash===test19.kandidatHashSHA256,'KANDIDAT_HASH_WIDERSPRUCH');
  return verified;
}
export async function run(){
  const dir=process.env.TEST21_ARTIFACT_DIR;
  need(dir&&process.env.GITHUB_TOKEN,'UMGEBUNG_FEHLT');
  const source=fs.readFileSync(path.join(process.env.GITHUB_WORKSPACE||'.','spieldaten.json'),'utf8');
  const verified=verifyEvidence({source,reportDir:dir,runId:process.env.TEST21_SOURCE_RUN,approval:process.env.TEST21_APPROVAL,expectedHash:process.env.TEST21_SOURCE_SHA,repository:process.env.GITHUB_REPOSITORY,event:process.env.GITHUB_EVENT_NAME});
  const pr=await createPr({verified,api:githubApi(process.env.GITHUB_TOKEN)});
  console.log('TEST27 TEST2v2-Draft-PR:',pr.url,'Änderungen:',pr.changes,'; kein Merge, keine LIVE-Aenderung');
  return pr;
}
if(process.argv[1]&&pathToFileURL(path.resolve(process.argv[1])).href===import.meta.url){run().catch(e=>{console.error('TEST27 SICHERHEITSABBRUCH:',e.message);process.exitCode=1;});}
