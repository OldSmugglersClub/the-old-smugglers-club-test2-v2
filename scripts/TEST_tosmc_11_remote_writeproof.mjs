// TOSMC: Only on a temporary test branch. Creates a synthetic change, never on main.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {validateTargetConfig, planOfficialChanges, applyOfficialChanges, updateScheduleSnapshot} from './terminwaechter-auto-core.mjs';
const root=process.cwd();
assert.equal(process.env.TOSMC_TEMP_BRANCH_TEST,'JA', 'TEST_BRANCH_FREIGABE_FEHLT');
assert.equal(process.env.GITHUB_REPOSITORY,'OldSmugglersClub/the-old-smugglers-club-test2-v2');
const source=fs.readFileSync('spieldaten.json','utf8');
const before=JSON.parse(source),cfg=JSON.parse(fs.readFileSync('terminwaechter/offizielle-quellen.json','utf8'));
delete cfg.datenVersionErwartet;delete cfg.spielbestandSHA256;
const allowedIds=validateTargetConfig(before,cfg);
const matches=before.saisons.flatMap(s=>s.spiele||[]);
const chosen=matches.find(g=>allowedIds.has(g.id)&&g.status!=='beendet'&&!Number.isInteger(g.heimtore)&&!Number.isInteger(g.auswaertstore)&&['datum','datumVon','datumBis','datumAnzeige','anstoss'].every(k=>k in g));
assert(chosen,'KEIN_UNBEENDETES_ZIELSPIEL');
const owned=cfg.quellen.find(q=>q.spielIds.includes(chosen.id));assert(owned);
const now=new Date('2026-10-30T12:00:00Z');
// Artificial date intentionally within the 56-day test window; never sourced from the internet.
const synthetic={datum:'2026-11-06',anstoss:chosen.anstoss==='20:45'?'21:15':'20:45'};
const fixture={spielId:chosen.id,quellenName:owned.name,status:'ABWEICHUNG',amtlich:synthetic};
const report={quellen:[{name:owned.name,status:'SPIELE_EXTRAHIERT'}],befunde:[fixture]};
const plan=planOfficialChanges(before,report,{allowedIds,now,windowDays:56,maxChanges:11});
assert.equal(plan.planned.length,1);
const after=applyOfficialChanges(before,plan,{allowedIds});
const expected=structuredClone(before),changed=expected.saisons.flatMap(s=>s.spiele).find(g=>g.id===chosen.id);
Object.assign(changed,{datum:synthetic.datum,datumVon:synthetic.datum,datumBis:synthetic.datum,datumAnzeige:'06.11.2026',anstoss:synthetic.anstoss});
assert.deepEqual(after,expected,'UNERLAUBTE_DATENVERAENDERUNG');
assert.notDeepEqual(after,before);
// Test the snapshot update algorithm separately, without committing or changing the snapshot.
const snapshotPresent=fs.existsSync('schedule-terminstand.json');
if(snapshotPresent){const original=JSON.parse(fs.readFileSync('schedule-terminstand.json','utf8'));const updated=updateScheduleSnapshot(original,after,[chosen.id]);const expectedSnapshot=structuredClone(original);const target=expectedSnapshot.entries?.[chosen.id];if(target)for(const k of ['datum','datumVon','datumBis','anstoss'])if(k in target)target[k]=changed[k];assert.deepEqual(updated,expectedSnapshot,'SNAPSHOT_FREMDER_WERT');}
// The sole tracked content change on this disposable branch.
fs.writeFileSync('spieldaten.json',JSON.stringify(after,null,2)+'\n');
const saved=JSON.parse(fs.readFileSync('spieldaten.json','utf8'));
assert.deepEqual(saved,expected,'SCHREIBEN_FEHLER');
const out={status:'LOKALER_BRANCH_SCHREIBTEST_BESTANDEN',art:'SYNTHETISCH',spielId:chosen.id,vorher:{datum:chosen.datum,anstoss:chosen.anstoss},nachher:synthetic,originalSHA256:crypto.createHash('sha256').update(source).digest('hex'),changeOnly:['spieldaten.json'],snapshotTest:snapshotPresent?'BESTANDEN':'DATEI_NICHT_VORHANDEN',remotePushUndRuecklesen:'WIRD_IM_WORKFLOW_GEPREUFT',mainVeraendert:false};
fs.mkdirSync(process.env.TOSMC_REPORT_DIR||'/tmp/tosmc-remote-writeproof',{recursive:true});fs.writeFileSync((process.env.TOSMC_REPORT_DIR||'/tmp/tosmc-remote-writeproof')+'/BRANCH_TEST.json',JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify(out,null,2));
