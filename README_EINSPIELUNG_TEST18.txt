TOSMC TEST18 – NUR TEST2v2 / READ-ONLY

INHALT:
.github/workflows/tosmc-test2v2-offizielle-terminquellen-diagnose.yml
scripts/offizielle-quellen-test18-auswertung.mjs
scripts/TEST_offizielle_quellen_TEST18.mjs

AENDERUNGEN:
- Browser-Exit 2 (fachlich unvollständig) wird nicht mehr als technischer Workflowfehler behandelt.
- Für tatsächliche technische Browser-Fehler bleibt der Workflow rot.
- Fehlende oder beschädigte Berichte führen ebenfalls zu technischem Fehler.
- Zusätzliche Berichte: TEST18_STATUS.json, TEST18_STATUS.md, TEST18_KORREKTURVORSCHLAEGE.json.
- Korrekturvorschläge sind nur Informationsdaten, keine Änderungen an spieldaten.json.
- Täglicher Zeitplan unverändert bei 07:17 UTC; dessen Zuverlässigkeit ist NOCH NICHT bestätigt.
- KEINE Änderungen an LIVE, Admin, Website-Daten, Tabellen oder Wertungen.

ANWENDUNG:
1. ZIP entpacken und die Ordner .github und scripts in das lokale TEST2v2-Repository kopieren.
2. In GitHub Desktop kontrollieren: exakt drei Dateien (eine Workflow-Datei, zwei neue Script-Dateien).
3. Commit und Push origin.
4. GitHub Actions: TOSMC TEST2v2 – Offizielle Terminquellen (nur Diagnose) > Workflow ausführen > main.
5. Laufstatus und neues Artefakt hier zur Kontrolle melden. Erst nach Prüfung über weitere Schritte entscheiden.

BESTANDSSCHUTZ: TEST2v2 vor LIVE, ausschließlich Nutzer-Commit/-Push, kein automatisches Deployment.
