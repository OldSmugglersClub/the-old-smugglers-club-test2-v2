// TOSMC TEST2v2: synthetischer Terminwechsel, strikt read-only.
// Nutzt echte 11 Ziel-IDs aus aktueller Konfiguration; mutiert ausschliesslich Objekte im Arbeitsspeicher.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {validateTargetConfig,planOfficialChanges,applyOfficialChanges,updateScheduleSnapshot} from './terminwaechter-auto-core.mjs';

const ROOT=process.cwd();
const REPO='OldSmugglersClub/the-old-smugglers-club-test2-v2';
if(process.env.GITHUB_ACTIONS==='true' && (process.env.GITHUB_REPOSITORY!==REPO || process.env.GITHUB_REF!=='refs/heads/main')) throw Error('NUR_TEST2V2_MAIN');
const file=path.join(ROOT,'spieldaten.json');
const configFile=path.join(ROOT,'terminwaechter/offizielle-quellen.json');
const snapshotFile=path.join(ROOT,'schedule-terminstand.json');
const original=fs.readFileSync(file);const originalHash=crypto.createHash('sha256').update(original).digest('hex');
const snapshotOrig=fs.existsSync(snapshotFile)?fs.readFileSync(snapshotFile):null;
const configOrig=fs.readFileSync(configFile);
const originalData=JSON.parse(original.toString('utf8'));
const config=JSON.parse(configOrig.toString('utf8'));
delete config.datenVersionErwartet; delete config.spielbestandSHA256;
const ids=validateTargetConfig(originalData,config);
const games=originalData.saisons.flatMap(s=>s.spiele||[]);
const valid=games.filter(g=>ids.has(g.id));
assert.equal(valid.length,11,'Jede Ziel-ID muss genau einmal im Spielbestand vorkommen');
const chosen=valid.find(g=>g.status!=='beendet'&&g.datum==='2026-10-31')||valid.find(g=>g.status!=='beendet');
assert(chosen,'Kein offenes Zielspiel');
const owner=config.quellen.find(q=>q.spielIds.includes(chosen.id));
assert(owner,'Quellenzuordnung fehlt');
const old={datum:chosen.datum,anstoss:chosen.anstoss};
// Stabiler, garantiert synthetischer Termin innerhalb des 56-Tage-Fensters.
const fake={datum:'2026-11-02',anstoss:old.anstoss==='20:45'?'21:15':'20:45'};
assert.notDeepEqual(fake,old);
const syntheticNow=new Date('2026-10-28T12:00:00Z');
const complete={quellen:[{name:owner.name,status:'SPIELE_EXTRAHIERT'}],befunde:[{spielId:chosen.id,quellenName:owner.name,status:'ABWEICHUNG',amtlich:fake}]};
const plan=planOfficialChanges(originalData,complete,{allowedIds:ids,now:syntheticNow,windowDays:56,maxChanges:11});
assert.equal(plan.planned.length,1);
const altered=applyOfficialChanges(originalData,plan,{allowedIds:ids});
const after=altered.saisons.flatMap(s=>s.spiele).find(g=>g.id===chosen.id);
assert.equal(after.datum,fake.datum);
assert.equal(after.datumVon,fake.datum);
assert.equal(after.datumBis,fake.datum);
assert.equal(after.datumAnzeige,'02.11.2026');
assert.equal(after.anstoss,fake.anstoss);
// Whole-tree invariant, only five representations at exactly one ID may differ.
const expected=structuredClone(originalData);
const expectedGame=expected.saisons.flatMap(s=>s.spiele).find(g=>g.id===chosen.id);
Object.assign(expectedGame,{datum:fake.datum,datumVon:fake.datum,datumBis:fake.datum,datumAnzeige:'02.11.2026',anstoss:fake.anstoss});
assert.deepEqual(altered,expected,'Unerlaubte Veraenderung im gesamten Datensatz');
const unchanged=valid.filter(g=>g.id!==chosen.id);
for(const g of unchanged){assert.deepEqual(altered.saisons.flatMap(s=>s.spiele).find(x=>x.id===g.id),g);}
// Snapshot test is in memory only.
if(snapshotOrig){const beforeSnap=JSON.parse(snapshotOrig.toString('utf8'));const afterSnap=updateScheduleSnapshot(beforeSnap,altered,[chosen.id]);
 const expectedSnap=structuredClone(beforeSnap);if(expectedSnap.entries?.[chosen.id])for(const f of ['datum','datumVon','datumBis','anstoss'])if(f in expectedSnap.entries[chosen.id])expectedSnap.entries[chosen.id][f]=after[f];
 assert.deepEqual(afterSnap,expectedSnap,'Snapshot veraendert Fremddaten');}
const run=(befunde,quellen=[{name:owner.name,status:'SPIELE_EXTRAHIERT'}])=>planOfficialChanges(originalData,{befunde,quellen},{allowedIds:ids,now:syntheticNow,windowDays:56});
assert.equal(run([{spielId:chosen.id,quellenName:owner.name,status:'KEIN_EINDEUTIGES_SPIEL'}]).planned.length,0,'Offener Termin nie uebernehmen');
assert.equal(run([{spielId:chosen.id,quellenName:owner.name,status:'ABWEICHUNG',amtlich:{datum:'2027-03-20',anstoss:'16:00'}}]).planned.length,0,'56-Tage-Grenze');
assert.throws(()=>run([{spielId:'bl-fremd',quellenName:owner.name,status:'ABWEICHUNG',amtlich:fake}]),/FREMDE_ABWEICHUNG/,'Andere Wettbewerbe blockieren');
assert.throws(()=>run([{spielId:chosen.id,quellenName:owner.name,status:'ABWEICHUNG',amtlich:fake}],[{name:owner.name,status:'BROWSER_FEHLER'}]),/QUELLE_UNSICHER/,'Quellenfehler blockieren');
assert.throws(()=>run([{spielId:chosen.id,quellenName:owner.name,status:'ABWEICHUNG',amtlich:{datum:'2026-11-02',anstoss:null}}]),/UNGESICHERTER_TERMIN/,'Unvollstaendige Zeit blockieren');
const ended=structuredClone(originalData);ended.saisons.flatMap(s=>s.spiele).find(g=>g.id===chosen.id).status='beendet';
assert.throws(()=>applyOfficialChanges(ended,plan,{allowedIds:ids}),/GESCHUETZTES_SPIEL/,'Beendete Spiele blockieren');
const scored=structuredClone(originalData);scored.saisons.flatMap(s=>s.spiele).find(g=>g.id===chosen.id).heimtore=2;
assert.throws(()=>applyOfficialChanges(scored,plan,{allowedIds:ids}),/GESCHUETZTES_SPIEL/,'Torwerte blockieren');
// File hashes: the synthetic fixture must never get persisted.
assert.deepEqual(fs.readFileSync(file),original,'spieldaten.json wurde veraendert');
assert.deepEqual(fs.readFileSync(configFile),configOrig,'Konfiguration wurde veraendert');
if(snapshotOrig)assert.deepEqual(fs.readFileSync(snapshotFile),snapshotOrig,'Snapshot wurde veraendert');
const result={status:'BESTANDEN',modus:'SYNTHETISCH_READ_ONLY',repository:REPO,anzahlZielspiele:ids.size,spielId:chosen.id,bisher:old,kuenstlich:fake,realerTermin:false,geprueft:['Exakte 11 IDs','Exakt ein Terminwechsel im Arbeitsspeicher','Datumsfelder konsistent','Gesamtdatenbestand sonst identisch','Ungeklaerte Termine blockiert','56-Tage-Fenster','Fremde Wettbewerbe blockiert','Fehlerhafte Quellen blockiert','Unvollstaendige Zeiten blockiert','Beendete Spiele blockiert','Torwerte blockiert','Snapshot nur im Arbeitsspeicher','Originaldateien unveraendert'],originalSHA256:originalHash};
const dir=path.join(ROOT,'terminwaechter-isolationstest-bericht');fs.mkdirSync(dir,{recursive:true});
fs.writeFileSync(path.join(dir,'ISOLATIONSTEST.json'),JSON.stringify(result,null,2)+'\n');
fs.writeFileSync(path.join(dir,'ISOLATIONSTEST.md'),`# TOSMC TEST2v2 – isolierter Terminwechsel\n\n**Status:** BESTANDEN. **Keine echte amtliche Terminveraenderung.**\n\nSpiel-ID: \`${chosen.id}\`  \nBisher: ${old.datum} ${old.anstoss}  \n**Kuenstlich angenommen:** ${fake.datum} ${fake.anstoss}\n\nDas Beispiel wurde ausschliesslich im Arbeitsspeicher berechnet. Alle Spieldaten, der Snapshot, die Konfiguration, andere Spiele und Wettbewerbe sind unveraendert.\n\nAlle ${result.geprueft.length} Schutzpunkte erfolgreich.\n`);
console.log(`PASS: ${result.geprueft.length} Schutzpunkte, ${ids.size} Zielspiele, synthetisch ${chosen.id} ${old.datum} ${old.anstoss} -> ${fake.datum} ${fake.anstoss}. Keine Repository-Daten geaendert.`);
