TOSMC TEST2v2 – Terminwaechter Frankreich/Portugal
Stand 30.10.2026

Nur fuer OldSmugglersClub/the-old-smugglers-club-test2-v2.
Ausgangspunkt: vom Nutzer gelieferter, in der vNext-Simulation getesteter Quellen-Fix; angepasst fuer den vorhandenen TEST2v2-Workflow.

EINZUSPIELEN (4 vollstaendige Dateien):
scripts/offizielle-liga-adapter.mjs
scripts/offizielle-quellen-browser.mjs
scripts/offizielle-quellen.mjs
scripts/TEST_tosmc_test2v2_frankreich_portugal.mjs

OPTIONAL ZU DEN TESTDATEIEN (3 Dateien, keine produktiven Spieldaten):
scripts/fixtures/terminwaechter/france-round19.json
scripts/fixtures/terminwaechter/portugal-round16.json
scripts/fixtures/terminwaechter/QUELLEN.md

KEINE UEBERNAHME aus dem Simulations-Fix:
- Kein Simulationsworkflow; .github/workflows/tosmc-test2v2-11-terminuebernahme.yml bleibt unveraendert.
- Kein Simulations-Schreibskript und keine Simulations-Repo-Sperren.
- Kein Ueberschreiben von terminwaechter/offizielle-quellen.json. Die bereits konfigurierte Frankreich-Zielrunde 19 und Portugal-Zielrunde 16 bleiben erhalten. Drei notwendige Teamaliase sind begrenzt in der Quellvergleichsfunktion ergaenzt.
- TEST2v2-eigene Core-Schutzlogik, 56-Tage-Grenze, Whitelist 11 IDs, GitHub-Freigabe und Commit/Push-Schritt bleiben unveraendert.
- Keine Aenderung an spieldaten.json, schedule-terminstand.json, Tipps, Ranglisten, OpenLigaDB, Admin, LIVE oder vNext.

VERHALTEN:
Frankreich (PSG - Olympique de Marseille) und Portugal (SL Benfica - Sporting CP):
Offizielle Paarung wird erkannt. Bei dateTimeUnknown=true oder fixtureDateIsDefined=false:
PAARUNG_GEFUNDEN_TERMIN_OFFEN, datum/anstoss/startDate=null, kein Schreibkandidat.
Bei spaeterem amtlich bestaetigten Zeitpunkt: IDENTISCH oder ABWEICHUNG, sofern eindeutig und sonstige Schutzregeln erfuellt.
Die bestehende TEST2v2-Automatik kann bei echten Suchluecken weiterhin anderweitige sichere Aenderungen ausfuehren; die globale Abort-on-gap-Strategie des Simulationsskripts wurde BEWUSST NICHT uebernommen. Eine separate Entscheidung ueber den gewuenschten Fail-closed-Modus ist daher moeglich.

PRUEFUNG:
1. Dateien ins lokale TEST2v2-Repository kopieren; nur diese 7 Pfade aendern/hinzufuegen.
2. GitHub Desktop Commit + Push.
3. GitHub Actions: "TOSMC TEST2v2 – 11 Anstosszeitpunkte kontrolliert uebernehmen" manuell Modus VORSCHAU starten. Kein UEBERNEHMEN fuer die erste Pruefung.
4. Erwartet: 11/11 eindeutig gefundene Paarungen; Frankreich/Portugal PAARUNG_GEFUNDEN_TERMIN_OFFEN; keine Platzhalter-Uebernahme. Reale Web-Abfrage und Workflow-Lauf muessen das noch bestaetigen.
5. Falls Ausfuehrung fehlschlaegt, Logs / Terminbericht bereitstellen.

LOKALE VORPRUEFUNG:
node scripts/TEST_tosmc_test2v2_frankreich_portugal.mjs : PASS
node --check fuer alle 3 produktiven Module: PASS
Die offizielle Online-Abfrage und automatisches GitHub Commit/Push wurden NICHT in diesem Paket nachgewiesen.
