# TOSMC TEST2v2 – täglicher Terminwächter (nur TEST2v2)

## Einspielen

Nur in das lokale Repository `the-old-smugglers-club-test2-v2` übernehmen. Die enthaltenen **vier Pfade** ersetzen/ergänzen exakt die genannten Dateien. GitHub Desktop: Änderungen prüfen → Commit → Push origin. Keine Dateien in LIVE, Admin oder vNext-Simulation kopieren.

## Neu

- Der bestehende Übernahme-Workflow erhält zusätzlich einen täglichen GitHub-Cron um **05:17 UTC** (06:17 Uhr MEZ / 07:17 Uhr MESZ). GitHub kann zeitlich verzögert ausführen.
- **Geplante Läufe** verwenden `UEBERNEHMEN` ausschließlich für TEST2v2 und den feststehenden internen Freigabetext. Die vorhandenen **manuell gestarteten Läufe** bleiben `VORSCHAU` als Standard oder ausdrücklich `UEBERNEHMEN` mit manuellem Freigabetext.
- Die **elf festen IDs** bleiben dauerhaft als Whitelist bestehen. Beendete Begegnungen (Status `beendet` oder Tore vorhanden) sind geschützt und müssen nach Abschluss **nicht aus der Konfiguration entfernt** werden. So bleibt die restliche Überwachung funktionsfähig.
- Bei 0 bestätigten Änderungen wird **kein Commit** erzeugt. Unbestätigte Frankreich-/Portugal-Termine bleiben unangetastet. Es bleibt beim 56-Tage-Fenster.
- Bestehende Schutztests, Quellenbrowser, Git-Schutz und die bestehende Synchronisierung werden beibehalten. Keine Änderungen an Admin, LIVE, Website-Layouts oder den Importworkflows anderer Wettbewerbe.

## Nach dem Einspielen prüfen

1. GitHub Actions: kontrollierter Übernahmeworkflow vorhanden; die Definition zeigt `schedule: cron '17 5 * * *'`.
2. Einmal manuell mit `VORSCHAU` starten, Freigabefeld leer. Alle Schutztests müssen grün sein.
3. Erst nach Prüfung des GitHub-Artefakts gilt der tägliche TEST2v2-Betrieb als bestätigt; bereits mit dem Push ist die Cron-Schedule auf `main` aktiviert.
4. Nach einem späteren tatsächlichen Terminwechsel Workflow-Bericht und Änderungen an `spieldaten.json` auf lediglich fünf Datums-/Uhrzeitrepräsentationen prüfen. Erst dann über gesonderte LIVE-Freigabe nachdenken.

**Hinweis:** Manuelles `UEBERNEHMEN` ist weiterhin schreibfähig. Die zwei ungeklärten Termine sind kein Fehler. GitHub führt geplante Runs nicht auf die Minute garantiert aus. 
