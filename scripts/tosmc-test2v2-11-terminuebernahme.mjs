// TOSMC TEST2v2: feststehende elf Anstoßzeitpunkte; niemals Admin/LIVE/vNext.
import fs from 'node:fs';
import path from 'node:path';
import {run as checkOfficial} from './offizielle-quellen-browser.mjs';
import {validateTargetConfig,planOfficialChanges,applyOfficialChanges,updateScheduleSnapshot} from './terminwaechter-auto-core.mjs';

const REPO='OldSmugglersClub/the-old-smugglers-club-test2-v2';
const GUARD='TEST2V2_NUR_11_ANSTOSSZEITPUNKTE';
const mode=process.env.TOSMC_MODE || 'VORSCHAU';
const root=process.cwd();
if(!['VORSCHAU','UEBERNEHMEN'].includes(mode)) throw Error('UNGUELTIGER_MODUS');
if(process.env.GITHUB_ACTIONS==='true' &&
  (process.env.GITHUB_REPOSITORY!==REPO || process.env.GITHUB_REF!=='refs/heads/main'))
  throw Error('NUR_TEST2V2_MAIN');
if(mode==='UEBERNEHMEN' && process.env.TOSMC_FREIGABE!==GUARD)
  throw Error('AUSDRUECKLICHE_FREIGABE_FEHLT');

const dataPath=path.join(root,'spieldaten.json');
const configPath=path.join(root,'terminwaechter/offizielle-quellen.json');
const snapshotPath=path.join(root,'schedule-terminstand.json');
const beforeText=fs.readFileSync(dataPath,'utf8');
const before=JSON.parse(beforeText);
const cfg=JSON.parse(fs.readFileSync(configPath,'utf8'));
delete cfg.datenVersionErwartet;
delete cfg.spielbestandSHA256;
const allowedIds=validateTargetConfig(before,cfg);
const found=await checkOfficial({config:cfg,siteGames:before});
for(const f of found.befunde||[]){
  const source=cfg.quellen.find(q=>q.spielIds?.includes(f.spielId));
  f.quellenName=source?.name||null;
}
// Explicitly refuse results for any unknown match even when status is not ABWEICHUNG.
if((found.befunde||[]).some(f=>!allowedIds.has(f.spielId)))
  throw Error('UNZULAESSIGER_BEFUND_AUSSERHALB_DER_11_SPIELE');
const plan=planOfficialChanges(before,found,{allowedIds,windowDays:56,maxChanges:11});
const next=applyOfficialChanges(before,plan,{allowedIds});
if(fs.readFileSync(dataPath,'utf8')!==beforeText)
  throw Error('QUELLDATEI_WAEHREND_PRUEFUNG_GEAENDERT');
const planned=plan.planned.map(p=>({id:p.id,bisher:(before.saisons.flatMap(s=>s.spiele).find(g=>g.id===p.id)||{}),neu:{datum:p.datum,anstoss:p.anstoss}}))
  .map(p=>({id:p.id,bisher:{datum:p.bisher.datum,anstoss:p.bisher.anstoss},neu:p.neu}));
const dir=path.join(root,'terminwaechter-bericht');
fs.mkdirSync(dir,{recursive:true});
const report={modus:mode,zeitpunkt:new Date().toISOString(),repository:REPO,freigabeNurTest2v2:true,anzahlZielspiele:allowedIds.size,quellen:found.quellen,befunde:found.befunde,geplanteAenderungen:planned,uebernommen:false};
const out=path.join(dir,'TEST2V2_11_ANSTOSSZEITPUNKTE_UEBERNAHME.json');
const md=path.join(dir,'TEST2V2_11_ANSTOSSZEITPUNKTE_UEBERNAHME.md');
const emit=()=>{
  fs.writeFileSync(out,JSON.stringify(report,null,2)+'\n');
  fs.writeFileSync(md,['# TEST2v2 – exakt 11 Anstoßzeitpunkte',`Modus: ${mode}`,
    `Zielspiele: ${allowedIds.size}`,`Geplante Änderungen im 56-Tage-Fenster: ${planned.length}`,
    `Übernommen: ${report.uebernommen ? 'Ja – ausschließlich TEST2v2' : 'Nein'}`,
    '',...planned.map(p=>`- ${p.id}: ${p.bisher.datum} ${p.bisher.anstoss} → ${p.neu.datum} ${p.neu.anstoss}`),
    '',`Ungeklärte Spiele bleiben unverändert. Alle anderen Wettbewerbe, Admin und LIVE sind ausgeschlossen.`,''].join('\n'));
};
emit();
if(mode==='UEBERNEHMEN' && planned.length){
  // Only these five representations of the same kickoff may differ; the core
  // verifies the complete object graph and refuses any unintended changes.
  const updatedText=JSON.stringify(next,null,2)+'\n';
  fs.writeFileSync(dataPath,updatedText,'utf8');
  if(fs.existsSync(snapshotPath)){
    const snapshotText=fs.readFileSync(snapshotPath,'utf8');
    const snapshot=JSON.parse(snapshotText);
    const updatedSnapshot=updateScheduleSnapshot(snapshot,next,planned.map(p=>p.id));
    if(JSON.stringify(snapshot)!==JSON.stringify(updatedSnapshot))
      fs.writeFileSync(snapshotPath,JSON.stringify(updatedSnapshot,null,2)+'\n');
  }
  report.uebernommen=true;
  emit();
}
console.log(`TOSMC TEST2v2: ${allowedIds.size} Zielspiele; ${found.verifiziert} amtlich verifiziert; ${planned.length} Korrektur(en) geplant; Uebernahme=${report.uebernommen}.`);
