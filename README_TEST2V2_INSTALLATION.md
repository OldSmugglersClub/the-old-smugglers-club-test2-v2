# TOSMC Test2v2 – manuelle offizielle Terminquellen-Diagnose

**Zweck:** Erster echter GitHub-Actions-Netztest im bereits bestehenden Test2v2-Repository; **kein viertes Repository**. Dieses ZIP ist ein **Datei-Ergänzungspaket**, keine vollständige Website, und darf **nicht auf LIVE** eingespielt werden.

## Vor Einspielung
- In GitHub ausdrücklich **Test2v2** wählen, nicht LIVE oder Simulation/vNext; Sicherung bzw. Commit-Stand notieren.
- Die Datei `spieldaten.json` aus Test2v2 **nicht ersetzen**. Das ZIP enthält absichtlich keine Website-Daten.
- Die neu hinzugefügte Quellenkonfiguration basiert auf dem zuletzt vorliegenden Website-Datenstand **datenVersion 82**. Falls Test2v2 eine andere Datenversion hat, muss die Konfiguration gegen den tatsächlichen Test2v2-Stand überprüft und angepasst werden – **nicht** die Datenversion blind umschreiben. Bei Abweichung bricht der Wächter ab.
- Nur wenn gleichnamige Dateien noch nicht existieren, die sechs Dateien aus dem ZIP nach exakt denselben relativen Pfaden ergänzen. Keinen vorhandenen Workflow überschreiben.

## Ausführen
1. ZIP entpacken und die darin enthaltenen `.github/`, `scripts/` und `terminwaechter/`-Dateien dem bestehenden **Test2v2-Repository** hinzufügen.
2. Nur nach Test2v2 committen/pushen. Bestehende Workflows und Daten unberührt lassen.
3. GitHub → **Actions** → **TOSMC TEST2v2 – Offizielle Terminquellen (nur Diagnose)** → **Run workflow** (Test2v2-Branch wählen). Bei GitHub Actions wird ein nur per `workflow_dispatch` startbarer Workflow in der Regel erst erkannt, wenn die Workflow-Datei auf dem **Default-Branch des Test2v2-Repositories** vorhanden ist. Gegebenenfalls den bestehenden Test2v2-Default-Branch verwenden; **nicht LIVE**.
4. Nach dem Lauf den Bericht unter **Artifacts** (`tosmc-test2v2-offizielle-quellen-diagnose`) herunterladen und hier hochladen. Bei rotem Lauf ist insbesondere der detaillierte Actions-Log wichtig.

## Sicherheits- und Testgrenzen
- Dieser Workflow hat lediglich `contents: read`, und Checkout speichert keine Push-Anmeldedaten. Es gibt **kein schedule**, keinen Commit und keinen Push.
- Die externen Seiten werden nur gelesen; Ergebnisse erscheinen als JSON/Markdown-Artefakte, nicht als Website-Update.
- Der Parser kann bisher nur JSON-LD `SportsEvent` sicher erkennen. Liefert eine Website kein solches Format, wird dies als **nicht verifiziert** gemeldet; weitere Parserentwicklung ist nötig.
- UEFA und DFB ohne bereits angelegte konkrete TOSMC-Spiele werden nur als `NOCH_KEINE_TOSMC_EINZELSPIELE` geführt: Das ist **kein Nachweis** einer erfolgreichen UEFA-/DFB-Quellenprüfung.
- Ein nicht grüner Lauf ist für die **Diagnose** erwartbar und **keine Berechtigung, Sperren zu umgehen**.
- Bundesliga-, Champions-League- und Dynamo-/Smugglerauftrag-Automatiken sowie Admin, Kicktipp, Tipps, Ergebnisse und Wertungen werden nicht verändert.
- Die Version 82 stammt aus der zuletzt hochgeladenen LIVE-`main.zip`; die tatsächliche Test2v2-Dateiversion konnte hier nicht live geprüft werden.
