// TEST22: all configured fixtures remain monitored, even when official details are incomplete.
// Read-only: never changes website data, provisional dates, Git or LIVE.
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const VALID_DATE = /^\d{4}-\d{2}-\d{2}$/;
const VALID_TIME = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
function check(ok, message) { if (!ok) throw Error(message); }
const isComplete = x => x && VALID_DATE.test(x.datum || '') && VALID_TIME.test(x.anstoss || '');

export function buildMonitor(data, config, browser, sonder, status) {
  check(data && Array.isArray(data.saisons), 'DATEN_UNGUELTIG');
  check(config && Array.isArray(config.quellen), 'QUELLEN_KONFIGURATION_UNGUELTIG');
  check(browser && Array.isArray(browser.befunde) && browser.automatischeAenderung === false, 'BROWSER_BERICHT_UNGUELTIG');
  check(sonder && Array.isArray(sonder.findings) && sonder.automaticModification === false, 'SONDERQUELLEN_BERICHT_UNGUELTIG');
  check(status && status.schema === 'TEST18' && status.technischerStatus === 'OK' && status.automatischeAenderung === false, 'TEST18_BERICHT_UNGUELTIG');
  check(browser.datenVersion === data.datenVersion && status.datenVersion === data.datenVersion, 'DATENVERSION_ABWEICHEND');
  const games = data.saisons.flatMap(s => s.spiele || []);
  const byId = new Map(games.map(g => [g.id,g]));
  check(byId.size === games.length, 'DOPPELTE_SPIEL_ID');
  const official = new Map();
  for (const b of browser.befunde) {
    check(typeof b.spielId === 'string' && !official.has(b.spielId), 'BROWSER_SPIEL_DOPPELT');
    official.set(b.spielId, b);
  }
  const hints = new Map();
  for (const x of sonder.findings) {
    check(typeof x.spielId === 'string' && !hints.has(x.spielId), 'SONDERQUELLE_SPIEL_DOPPELT');
    hints.set(x.spielId,x);
  }
  const ids = new Set(), spiele=[];
  for (const source of config.quellen) for (const id of source.spielIds || []) {
    check(typeof id === 'string' && !ids.has(id), 'KONFIGURATION_SPIEL_DOPPELT');
    ids.add(id);
    const game = byId.get(id), finding = official.get(id), hint = hints.get(id);
    check(game && game.status !== 'beendet', 'SPIEL_FEHLT_ODER_ABGESCHLOSSEN: '+id);
    check(finding, 'BROWSER_BEFUND_FEHLT: '+id);
    const current = {datum:game.datum,anstoss:game.anstoss};
    const hasValidated = ['IDENTISCH','ABWEICHUNG'].includes(finding.status) && isComplete(finding.amtlich);
    if (['IDENTISCH','ABWEICHUNG'].includes(finding.status)) check(hasValidated,'BESTAETIGUNG_OHNE_VOLLSTAENDIGEN_TERMIN: '+id);
    if (finding.status === 'ABWEICHUNG') {
      check(finding.bisher?.datum === current.datum && finding.bisher?.anstoss === current.anstoss,'ALTTERMIN_WIDERSPRUCH: '+id);
    }
    if (finding.status === 'IDENTISCH') {
      check(finding.amtlich.datum === current.datum && finding.amtlich.anstoss === current.anstoss,'IDENTISCH_WIDERSPRUCH: '+id);
    }
    const action = finding.status === 'ABWEICHUNG' ? 'KORREKTUR_NUR_NACH_FREIGABE' : 'BESTAND_UNVERAENDERT';
    const entry = {
      spielId:id, wettbewerb:game.wettbewerb, quelle:source.url,
      websiteBestand:current,
      quellenstatus:finding.status,
      bestaetigterTermin:hasValidated?{datum:finding.amtlich.datum,anstoss:finding.amtlich.anstoss}:null,
      zusatzhinweis:hint?{status:hint.status,datum:hint.datum||null,anstoss:hint.anstoss||null}:null,
      ueberwachung:'AKTIV', naechsteAktion:action, automatischeAenderung:false
    };
    // Supplementary announcements, partial dates and placeholders are never release evidence.
    if (entry.naechsteAktion === 'KORREKTUR_NUR_NACH_FREIGABE') check(hasValidated,'UNBESTAETIGTE_KORREKTUR');
    spiele.push(entry);
  }
  check(official.size === ids.size && [...official.keys()].every(k=>ids.has(k)), 'BROWSER_ABDECKUNG_WIDERSPRUCH');
  const abweichungen=spiele.filter(x=>x.naechsteAktion==='KORREKTUR_NUR_NACH_FREIGABE').length;
  check(status.anzahl?.gesamt===spiele.length && status.anzahl?.abweichungen===abweichungen, 'TEST18_ANZAHL_WIDERSPRUCH');
  return {
    schema:'TEST22', modus:'DURCHGAENGIGE_READ_ONLY_UEBERWACHUNG', erstellt:new Date().toISOString(),
    anzahl:{ueberwacht:spiele.length, verifiziert:spiele.filter(x=>x.bestaetigterTermin).length, offen:spiele.filter(x=>!x.bestaetigterTermin).length, korrekturvorschlaege:abweichungen},
    regel:'Ohne vollständig offiziell bestätigten Termin keine Änderung am bestehenden Website-Datum oder -Anstoß.',
    automatischeAenderung:false, liveFreigabe:false, spiele
  };
}
export function run({root='.', reportDir='terminwaechter-bericht'}={}) {
  const fromRoot=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
  const fromReport=p=>JSON.parse(fs.readFileSync(path.join(reportDir,p),'utf8'));
  const report=buildMonitor(fromRoot('spieldaten.json'),fromRoot('terminwaechter/offizielle-quellen.json'),fromReport('BROWSER_QUELLEN_BERICHT.json'),fromReport('SONDERQUELLEN_TEST16.json'),fromReport('TEST18_STATUS.json'));
  fs.mkdirSync(reportDir,{recursive:true});
  fs.writeFileSync(path.join(reportDir,'TEST22_UEBERWACHUNG.json'),JSON.stringify(report,null,2)+'\n');
  const rows=report.spiele.map(x=>`- ${x.spielId}: ${x.quellenstatus}; Website ${x.websiteBestand.datum} ${x.websiteBestand.anstoss}; offiziell ${x.bestaetigterTermin?x.bestaetigterTermin.datum+' '+x.bestaetigterTermin.anstoss:'NICHT VOLLSTAENDIG BESTAETIGT'}; ${x.naechsteAktion}${x.zusatzhinweis?' (Zusatzhinweis '+x.zusatzhinweis.status+')':''}`);
  fs.writeFileSync(path.join(reportDir,'TEST22_UEBERWACHUNG.md'),['# TEST22 – Vollständige Terminüberwachung','',`Überwacht: ${report.anzahl.ueberwacht}; verifiziert: ${report.anzahl.verifiziert}; offen: ${report.anzahl.offen}; Korrekturvorschläge: ${report.anzahl.korrekturvorschlaege}`,'','Alle Spieltermine bleiben auf der Website unverändert, bis vollständige bestätigte neue Daten vorliegen und eine separate Freigabe erfolgt.','',...rows,'','Keine automatische Einspielung. LIVE unverändert.'].join('\n')+'\n');
  console.log('TEST22:',JSON.stringify(report.anzahl));
  return report;
}
if(process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href===import.meta.url){
  try {run({root:process.env.TOSMC_ROOT||'.',reportDir:process.env.TOSMC_OFFICIAL_OUT||'terminwaechter-bericht'});}catch(e){console.error('TEST22 SICHERHEITSABBRUCH:',e.message);process.exitCode=1;}
}
