// TOSMC TEST2v2 – einmaliger manueller offizieller Termincheck, STRICT READ-ONLY.
// Referenzcode aus vNext angepasst; KEIN Importer und keine Admin-Aenderung.
import fs from 'node:fs';
import path from 'node:path';
import {run as checkOfficial} from './offizielle-quellen-browser.mjs';
import {validateTargetConfig,planOfficialChanges} from './terminwaechter-auto-core.mjs';
const ROOT=path.resolve('.');
const REPO='OldSmugglersClub/the-old-smugglers-club-test2-v2';
if(process.env.GITHUB_ACTIONS==='true' && (process.env.GITHUB_REPOSITORY!==REPO || process.env.GITHUB_REF!=='refs/heads/main')) throw Error('TEST2V2_MAIN_AUSSCHLIESSLICH');
const data=JSON.parse(fs.readFileSync(path.join(ROOT,'spieldaten.json'),'utf8'));
const cfg=JSON.parse(fs.readFileSync(path.join(ROOT,'terminwaechter/offizielle-quellen.json'),'utf8'));
// Repository-version is not part of external source config and must not pin historical versions.
delete cfg.datenVersionErwartet;delete cfg.spielbestandSHA256;
const ids=validateTargetConfig(data,cfg);
const before=JSON.stringify(data);
const report=await checkOfficial({config:cfg,siteGames:data});
for(const finding of report.befunde){
 const source=cfg.quellen.find(q=>q.spielIds?.includes(finding.spielId));
 finding.quellenName=source?.name||null;
}
const plan=planOfficialChanges(data,report,{allowedIds:ids});
if(JSON.stringify(JSON.parse(fs.readFileSync(path.join(ROOT,'spieldaten.json'),'utf8')))!==before)throw Error('SPIELDATEN_IM_PRUEFLAUF_VERAENDERT');
const output=path.join(ROOT,'terminwaechter-bericht');fs.mkdirSync(output,{recursive:true});
const entries=report.befunde.map(f=>({spielId:f.spielId,pruefstatus:f.status,quelle:f.quellenName||null,bisher:f.bisher||null,amtlich:f.amtlich?{datum:f.amtlich.datum,anstoss:f.amtlich.anstoss}:null,innerhalb56Tagen:plan.planned.some(p=>p.id===f.spielId)}));
fs.writeFileSync(path.join(output,'TEST2V2_TERMIN_VORSCHAU.json'),JSON.stringify({stand:new Date().toISOString(),repository:REPO,modus:'NUR_PRUEFUNG',zielspiele:ids.size,verifiziert:report.verifiziert,befunde:entries,freigabe:'KEINE_AUTOMATISCHE_UEBERNAHME'},null,2)+'\n');
const lines=['# TOSMC TEST2v2 – Prüfung der 11 Anstoßzeitpunkte','',`Prüfdatum: ${new Date().toISOString()}`,'','**Keine Spieldaten verändert; keine automatische Übernahme.**','',`Eindeutig geprüft: ${report.verifiziert}/11`,`Aktuell sicher veränderbar (56-Tage-Fenster): ${plan.planned.length}`,'',...entries.map(e=>`- ${e.spielId}: ${e.pruefstatus}${e.amtlich?' – offiziell '+e.amtlich.datum+' '+e.amtlich.anstoss:''}${e.innerhalb56Tagen?' – innerhalb 56 Tagen':''}`),''];
fs.writeFileSync(path.join(output,'TEST2V2_TERMIN_VORSCHAU.md'),lines.join('\n'));
console.log(`TEST2v2 – 11 Spiele geprueft; ${report.verifiziert}/11 eindeutig; ${plan.planned.length} mögliche Korrekturen im 56-Tage-Fenster; KEINE DATEIEN VERAENDERT.`);
