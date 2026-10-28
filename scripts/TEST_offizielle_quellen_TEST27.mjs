// Synthetic regression: TEST25 -> TEST20 -> TEST27 Draft-PR guard. No GitHub writes.
import assert from 'node:assert/strict';
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';import crypto from 'node:crypto';
import {buildCandidate} from './offizielle-quellen-test19-vorschau.mjs';
import {prepare} from './offizielle-quellen-test20-freigabe.mjs';
import {verifyEvidence} from './offizielle-quellen-test27-pr-guard.mjs';
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const id='pk-test27';
const old={datum:'2027-02-07',anstoss:'20:45'}, next={datum:'2027-02-08',anstoss:'21:00'};
const original=`{\n  \"datenVersion\": 82,\n  \"saisons\": [\n    {\n      \"spiele\": [\n        {\n          \"id\": \"pk-test27\",\n          \"wettbewerb\": \"piratenkodex\",\n          \"status\": \"terminiert\",\n          \"heimtore\": null,\n          \"auswaertstore\": null,\n          \"datum\": \"2027-02-07\",\n          \"datumVon\": \"2027-02-07\",\n          \"datumBis\": \"2027-02-07\",\n          \"datumAnzeige\": \"07.02.2027\",\n          \"anstoss\": \"20:45\"\n        }\n      ]\n    }\n  ]\n}\n`;
const proposal={spielId:id,bisher:old,vorschlag:next,quelle:'https://ligue1.com/en/calendar/ligue1',freigabe:'MANUELLE_PRUEFUNG_ERFORDERLICH',automatischAnwenden:false};
const proposals={schema:'TEST18',modus:'VORSCHLAEGE_NUR_ZUR_SICHTUNG',automatischeAenderung:false,vorschlaege:[proposal]};
const status={schema:'TEST18',technischerStatus:'OK',datenVersion:82,automatischeAenderung:false,anzahl:{abweichungen:1}};
const built=buildCandidate(original,JSON.stringify(proposals),JSON.stringify(status));
const approved=prepare({source:original,manifest:JSON.stringify(built.manifest),proposal:JSON.stringify(proposals),status:JSON.stringify(status),approval:'TEST2V2_FREIGABE',expectedHash:sha(original)});
assert.equal(approved.candidate,built.candidate);
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'tosmc-test27-'));
function save(n,o){const p=path.join(dir,n);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,typeof o==='string'?o:JSON.stringify(o));}
const monitorRow={spielId:id,ueberwachung:'AKTIV',websiteBestand:old,bestaetigterTermin:next};
const bridgeRow={spielId:id,websiteBestand:old,amtlicherTermin:next,korrekturZurManuellenPruefung:true};
const monitor={schema:'TEST22',automatischeAenderung:false,anzahl:{ueberwacht:1},spiele:[monitorRow]};
const bridge={schema:'TEST25',modus:'READ_ONLY_QUELLENBRUECKE',datenVersion:82,automatischeAenderung:false,automatischeGitAenderung:false,liveFreigabe:false,anzahl:{ueberwacht:1,konflikte:0,korrekturZurManuellenPruefung:1},spiele:[bridgeRow]};
const browser={automatischeAenderung:false,befunde:[{spielId:id,status:'ABWEICHUNG',bisher:old,amtlich:next}]};
save('TEST19_MANIFEST.json',built.manifest);save('TEST18_KORREKTURVORSCHLAEGE.json',proposals);
save('TEST18_STATUS.json',status);save('TEST20_STATUS.json',approved.result);
save('TEST20_NUR_NACH_MANUELLER_FREIGABE_TEST2V2/spieldaten.json',built.candidate);
save('TEST25_QUELLENBRUECKE.json',bridge);save('TEST22_UEBERWACHUNG.json',monitor);save('BROWSER_QUELLEN_BERICHT.json',browser);
const opts={source:original,reportDir:dir,runId:'40717272526',expectedHash:sha(original),approval:'TEST2V2_PR_ERSTELLEN',repository:'OldSmugglersClub/the-old-smugglers-club-test2-v2',event:'workflow_dispatch'};
try{
 const result=verifyEvidence(opts);assert.equal(result.changes.length,1);
 assert.throws(()=>verifyEvidence({...opts,approval:''}),/FREIGABE/);
 assert.throws(()=>verifyEvidence({...opts,repository:'OldSmugglersClub/the-old-smugglers-club'}),/FALSCHES_REPOSITORY/);
 assert.throws(()=>verifyEvidence({...opts,event:'schedule'}),/KEIN_MANUELLER_LAUF/);
 assert.throws(()=>verifyEvidence({...opts,source:original+' '}),/QUELLHASH_WIDERSPRUCH/);
 save('TEST25_QUELLENBRUECKE.json',{...bridge,anzahl:{...bridge.anzahl,konflikte:1}});
 assert.throws(()=>verifyEvidence(opts),/QUELLENKONFLIKT/);save('TEST25_QUELLENBRUECKE.json',bridge);
 save('BROWSER_QUELLEN_BERICHT.json',{...browser,befunde:[{...browser.befunde[0],amtlich:{datum:next.datum,anstoss:'22:00'}}]});
 assert.throws(()=>verifyEvidence(opts),/BROWSER_UND_VORSCHLAG_WIDERSPRUCH/);save('BROWSER_QUELLEN_BERICHT.json',browser);
 save('TEST22_UEBERWACHUNG.json',{...monitor,spiele:[{...monitorRow,bestaetigterTermin:null}]});
 assert.throws(()=>verifyEvidence(opts),/MONITOR_UND_VORSCHLAG_WIDERSPRUCH/);save('TEST22_UEBERWACHUNG.json',monitor);
 save('TEST20_STATUS.json',{...approved.result,freigabe:'NICHT_FREIGEGEBEN'});
 assert.throws(()=>verifyEvidence(opts),/TEST20_FREIGABE_FEHLT/);save('TEST20_STATUS.json',approved.result);
 save('TEST19_MANIFEST.json',{...built.manifest,anzahlAenderungen:0});
 assert.throws(()=>verifyEvidence(opts),/KEINE_KORREKTUREN/);
 if(process.argv.includes('--report')){
   const out='test27-bericht';fs.mkdirSync(out,{recursive:true});
   fs.writeFileSync(path.join(out,'TEST27_STATUS.json'),JSON.stringify({schema:'TEST27',status:'BESTANDEN',prErstellt:false,websiteAenderung:false,liveAenderung:false,synthetischePruefungen:10,hinweis:'Kuenstlicher Terminwechsel. Kein realer PR oder Spieltermin geaendert.'},null,2)+'\n');
 }
 console.log('TEST27: 10 synthetic guard tests passed. No website, Git or LIVE changes.');
}finally{fs.rmSync(dir,{recursive:true,force:true});}
