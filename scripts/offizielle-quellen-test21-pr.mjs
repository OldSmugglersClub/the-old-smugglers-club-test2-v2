// TEST21 – explicit manual TEST2v2 Pull Request, never a direct main or LIVE change.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {prepare} from './offizielle-quellen-test20-freigabe.mjs';

const sha256=s=>crypto.createHash('sha256').update(s).digest('hex');
const requireSafe=(ok,msg)=>{if(!ok)throw Error(msg);};
const REPO='OldSmugglersClub/the-old-smugglers-club-test2-v2';
const WORKFLOW='.github/workflows/tosmc-test2v2-offizielle-terminquellen-diagnose.yml';
const ARTIFACT='tosmc-test2v2-offizielle-quellen-diagnose';

export function validate({source,reportDir,runId,approval,expectedHash,repository=REPO,event='workflow_dispatch'}){
 requireSafe(repository===REPO,'FALSCHES_REPOSITORY');
 requireSafe(event==='workflow_dispatch','KEIN_MANUELLER_LAUF');
 requireSafe(approval==='TEST2V2_PR_ERSTELLEN','AUSDRUECKLICHE_PR_FREIGABE_FEHLT');
 requireSafe(/^\d{8,16}$/.test(String(runId)),'RUN_ID_UNGUELTIG');
 requireSafe(/^[0-9a-f]{64}$/.test(expectedHash),'SHA256_UNGUELTIG');
 const read=p=>fs.readFileSync(path.join(reportDir,p),'utf8');
 const manifest=read('TEST19_MANIFEST.json');
 const proposals=read('TEST18_KORREKTURVORSCHLAEGE.json');
 const status=read('TEST18_STATUS.json');
 const test20=JSON.parse(read('TEST20_STATUS.json'));
 const validated=prepare({source,manifest,proposal:proposals,status,approval:'TEST2V2_FREIGABE',expectedHash,event:'workflow_dispatch'});
 requireSafe(validated.result.freigabe==='MANUELL_FUER_TEST2V2_FREIGEGEBEN','TEST20_NICHT_FREIGEGEBEN');
 requireSafe(test20.freigabe==='MANUELL_FUER_TEST2V2_FREIGEGEBEN'&&test20.liveFreigabe===false&&test20.automatischeGitAenderung===false,'TEST20_STATUS_NICHT_FREIGEGEBEN');
 requireSafe(test20.quelleHashSHA256===expectedHash&&test20.kandidatHashSHA256===validated.result.kandidatHashSHA256,'TEST20_PRUEFSUMMENKONFLIKT');
 const stored=read('TEST20_NUR_NACH_MANUELLER_FREIGABE_TEST2V2/spieldaten.json');
 requireSafe(stored===validated.candidate,'TEST20_ARTIFAKT_ABWEICHEND');
 requireSafe(sha256(source)===expectedHash,'AKTUELLER_BESTAND_ABWEICHEND');
 const m=JSON.parse(manifest);
 requireSafe(m.anzahlAenderungen>=1&&m.anzahlAenderungen<=25,'AENDERUNGSUMFANG_UNZULAESSIG');
 return {candidate:validated.candidate,changes:m.aenderungen,sourceHash:expectedHash,candidateHash:sha256(validated.candidate),runId:String(runId)};
}

export async function createPr({verified,api,now=new Date(),maxAgeHours=48}){
 // Preflight all conditions BEFORE creating any Git objects.
 const run=await api('GET',`/actions/runs/${verified.runId}`);
 requireSafe(run.event==='workflow_dispatch'&&run.conclusion==='success'&&run.status==='completed','QUELLLAUF_NICHT_ERFOLGREICH_MANUELL');
 requireSafe(run.path===WORKFLOW&&run.head_branch==='main','QUELLLAUF_FALSCHER_WORKFLOW');
 const age=now.getTime()-Date.parse(run.created_at);
 requireSafe(Number.isFinite(age)&&age>=0&&age<=maxAgeHours*3600000,'QUELLLAUF_ZU_ALT');
 const main=await api('GET','/git/ref/heads/main');
 const baseSha=main.object?.sha;
 requireSafe(/^[a-f0-9]{40}$/.test(baseSha||''),'MAIN_SHA_FEHLT');
 // Head must still be the checkout/source of the approved artifact; otherwise no PR.
 requireSafe(run.head_sha===baseSha,'MAIN_SEIT_QUELLLAUF_VERAENDERT');
 const branch=`terminwaechter/test21-${verified.runId}`;
 try {await api('GET',`/git/ref/heads/${branch}`);throw Error('PR_BRANCH_BEREITS_VORHANDEN');}
 catch(e){if(e.message==='PR_BRANCH_BEREITS_VORHANDEN')throw e;if(e.status!==404)throw e;}
 const current=await api('GET','/contents/spieldaten.json?ref=main');
 // Exact raw blob SHA check against the current file in repository, not only the run.
 const contentSha=crypto.createHash('sha1').update(Buffer.from(`blob ${Buffer.byteLength(verified.candidate)}\0`+verified.candidate)).digest('hex');
 requireSafe(current.type==='file'&&typeof current.sha==='string','REPOSITORY_DATEI_UNGUELTIG');
 // Source checked by checkout and run HEAD; ensure current Git blob was still from that checkout.
 const baseCommit=await api('GET',`/git/commits/${baseSha}`);
 requireSafe(/^[a-f0-9]{40}$/.test(baseCommit.tree?.sha||''),'TREE_FEHLT');
 const blob=await api('POST','/git/blobs',{content:Buffer.from(verified.candidate).toString('base64'),encoding:'base64'});
 requireSafe(blob.sha===contentSha,'KANDIDAT_BLOB_SHA_ABWEICHEND');
 const tree=await api('POST','/git/trees',{base_tree:baseCommit.tree.sha,tree:[{path:'spieldaten.json',mode:'100644',type:'blob',sha:blob.sha}]});
 const commit=await api('POST','/git/commits',{message:`TEST21: ${verified.changes.length} offiziell geprüfte Termine (nur TEST2v2)`,tree:tree.sha,parents:[baseSha]});
 await api('POST','/git/refs',{ref:`refs/heads/${branch}`,sha:commit.sha});
 const pr=await api('POST','/pulls',{title:`TEST21: ${verified.changes.length} Terminkorrekturen prüfen (nur TEST2v2)`,head:branch,base:'main',body:`Manuell autorisierter TEST21-Vorschlag aus Lauf ${verified.runId}.\n\nNur spieldaten.json, ${verified.changes.length} geprüfte Termine.\n\n**Nicht automatisch mergen!** Prüfe Diff und Startseiten-Kachel. LIVE bleibt unberührt.\n\nQuelle SHA256: ${verified.sourceHash}\nKandidat SHA256: ${verified.candidateHash}`,draft:true});
 requireSafe(pr.draft===true&&typeof pr.html_url==='string','DRAFT_PR_NICHT_BESTAETIGT');
 return {url:pr.html_url,number:pr.number,branch,changes:verified.changes.length};
}

export function githubApi(token,repo=REPO){return async(method,endpoint,data)=>{
 const r=await fetch(`https://api.github.com/repos/${repo}${endpoint}`,{method,headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28',...(data?{'Content-Type':'application/json'}:{})},body:data?JSON.stringify(data):undefined,signal:AbortSignal.timeout(20000)});
 if(!r.ok){const e=Error(`GITHUB_API_${r.status}: ${endpoint}`);e.status=r.status;throw e;}
 return r.json();
};}

async function main(){
 const root=process.env.GITHUB_WORKSPACE||'.';
 const reportDir=process.env.TEST21_ARTIFACT_DIR;
 requireSafe(reportDir&&process.env.GITHUB_TOKEN,'GITHUB_UMGEBUNG_FEHLT');
 const verified=validate({source:fs.readFileSync(path.join(root,'spieldaten.json'),'utf8'),reportDir,runId:process.env.TEST21_SOURCE_RUN,approval:process.env.TEST21_APPROVAL,expectedHash:process.env.TEST21_SOURCE_SHA,repository:process.env.GITHUB_REPOSITORY,event:process.env.GITHUB_EVENT_NAME});
 const pr=await createPr({verified,api:githubApi(process.env.GITHUB_TOKEN)});
 console.log(`TEST21 Draft-PR erstellt: ${pr.url}; ${pr.changes} Änderungen; kein Merge und keine LIVE-Änderung.`);
}
if(process.argv[1]&&pathToFileURL(path.resolve(process.argv[1])).href===import.meta.url){main().catch(e=>{console.error('TEST21 SICHERHEITSABBRUCH:',e.message);process.exitCode=1;});}
