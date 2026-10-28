// TEST28: manually initiated, isolated draft PR that changes only a harmless test file.
// Never edits spieldaten.json, protected paths, main, or LIVE. No merge operations.
import crypto from 'node:crypto';
import {pathToFileURL} from 'node:url';
import path from 'node:path';

export const REPO='OldSmugglersClub/the-old-smugglers-club-test2-v2';
export const TEST_PATH='test28-sandbox/TEST28_DRAFT_PR_ONLY.txt';
const need=(ok,msg)=>{if(!ok)throw new Error('TEST28_BLOCKIERT_'+msg)};
const isSha=s=>typeof s==='string'&&/^[0-9a-f]{40}$/.test(s);
export function validateContext({repository,event,ref,approval,runId,headSha,baseSha}) {
 need(repository===REPO,'FALSCHES_REPOSITORY');
 need(event==='workflow_dispatch','NICHT_MANUELL');
 need(ref==='refs/heads/main','NICHT_MAIN_REFERENZ');
 need(approval==='TEST28_NUR_TESTDATEI_PR','FREIGABE_FEHLT');
 need(/^\d{8,16}$/.test(String(runId)),'RUN_ID_UNGUELTIG');
 need(isSha(headSha)&&isSha(baseSha)&&headSha===baseSha,'MAIN_SEIT_CHECKOUT_VERAENDERT');
 return true;
}
export function changesAreSafe(paths) {
 need(Array.isArray(paths)&&paths.length===1&&paths[0]===TEST_PATH,'UNZULAESSIGE_DATEIEN');
 return true;
}
export async function draft({api,repository,event,ref,approval,runId,headSha,runUrl}){
 need(repository===REPO&&event==='workflow_dispatch'&&ref==='refs/heads/main'&&approval==='TEST28_NUR_TESTDATEI_PR','UMGEBUNG_ODER_FREIGABE');
 const main=await api('GET','/git/ref/heads/main');const baseSha=main.object?.sha;
 validateContext({repository,event,ref,approval,runId,headSha,baseSha});
 const branch=`test28/sandbox-${runId}`;
 try{await api('GET',`/git/ref/heads/${branch}`);throw new Error('TEST28_BLOCKIERT_BRANCH_BEREITS_DA')}
 catch(e){if(e.status!==404)throw e;}
 const commit=await api('GET',`/git/commits/${baseSha}`);
 need(isSha(commit.tree?.sha),'BASE_TREE_UNGUELTIG');
 const marker=`TEST28 ISOLIERTER DRAFT PR\nRun: ${runId}\nBasis: ${baseSha}\nNur Testdatei, NICHT MERGEN.\n`;
 changesAreSafe([TEST_PATH]);
 const expectedBlob=crypto.createHash('sha1').update(`blob ${Buffer.byteLength(marker)}\0${marker}`).digest('hex');
 // All preflight checks happen before the first write.
 const blob=await api('POST','/git/blobs',{content:Buffer.from(marker).toString('base64'),encoding:'base64'});
 need(blob.sha===expectedBlob,'BLOB_HASH_UNGUELTIG');
 const tree=await api('POST','/git/trees',{base_tree:commit.tree.sha,tree:[{path:TEST_PATH,mode:'100644',type:'blob',sha:blob.sha}]});
 need(isSha(tree.sha),'TEST_TREE_UNGUELTIG');
 const branchCommit=await api('POST','/git/commits',{message:'TEST28: isolierter Draft-PR-Test (NICHT MERGEN)',tree:tree.sha,parents:[baseSha]});
 need(isSha(branchCommit.sha),'TEST_COMMIT_UNGUELTIG');
 await api('POST','/git/refs',{ref:`refs/heads/${branch}`,sha:branchCommit.sha});
 const pr=await api('POST','/pulls',{title:`TEST28 SANDBOX – NUR PR-VERFAHREN PRUEFEN – NICHT MERGEN (${runId})`,head:branch,base:'main',draft:true,body:`**NICHT MERGEN.** Isolierter Integrationstest. Einzige zulässige Änderung: \`${TEST_PATH}\`.\n\nKeine Termindaten, kein LIVE, kein Merge.\n\nWorkflow: ${runUrl||'GitHub Actions Test28'}`});
 need(pr.draft===true&&typeof pr.html_url==='string','DRAFT_PR_NICHT_BESTAETIGT');
 return {url:pr.html_url,number:pr.number,branch,path:TEST_PATH,baseSha,commitSha:branchCommit.sha};
}
export function githubApi(token){return async(method,endpoint,data)=>{
 const response=await fetch(`https://api.github.com/repos/${REPO}${endpoint}`,{method,headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28',...(data?{'Content-Type':'application/json'}:{})},body:data?JSON.stringify(data):undefined,signal:AbortSignal.timeout(20000)});
 if(!response.ok){const e=new Error(`GITHUB_HTTP_${response.status}_${endpoint}`);e.status=response.status;throw e;}
 return response.json();
};}
if(process.argv[1]&&pathToFileURL(path.resolve(process.argv[1])).href===import.meta.url){
 const env=process.env;
 if(!env.GITHUB_TOKEN){console.error('TEST28_BLOCKIERT_TOKEN_FEHLT');process.exitCode=1;}
 else draft({api:githubApi(env.GITHUB_TOKEN),repository:env.GITHUB_REPOSITORY,event:env.GITHUB_EVENT_NAME,ref:env.GITHUB_REF,approval:env.TEST28_APPROVAL,runId:env.GITHUB_RUN_ID,headSha:env.GITHUB_SHA,runUrl:`${env.GITHUB_SERVER_URL}/${env.GITHUB_REPOSITORY}/actions/runs/${env.GITHUB_RUN_ID}`}).then(x=>console.log('TEST28_DRAFT_PR_RESULT='+JSON.stringify(x))).catch(e=>{console.error(e.message);process.exitCode=1});
}
