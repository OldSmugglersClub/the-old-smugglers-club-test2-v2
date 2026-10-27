# TOSMC TEST17 – Tägliche READ-ONLY-Diagnose in TEST2v2

**Status:** Nur TEST2v2. Kein LIVE-Release. Noch keine automatische Terminkorrektur.

## Einspielen
ZIP entpacken. Den enthaltenen Ordner `.github` in die Wurzel des lokalen Repositories `the-old-smugglers-club-test2-v2` kopieren; gleichnamige Workflow-Datei überschreiben. In GitHub Desktop sollte ausschließlich `.github/workflows/tosmc-test2v2-offizielle-terminquellen-diagnose.yml` geändert erscheinen. Commit und Push origin durch den Nutzer.

## Verhalten
- Bestehender manueller Start (`workflow_dispatch`) bleibt.
- Täglicher automatischer Start mit GitHub Actions Cron um 07:17 UTC, in Deutschland 08:17 MEZ beziehungsweise 09:17 MESZ. Die Uhrzeit ist **nicht** ganzjährig identisch in Berlin.
- `contents: read`, `persist-credentials: false`; kein Commit, Push oder Website-Schreiben.
- Parallel laufende manuelle/geplante Diagnosen werden serialisiert.
- Die bekannten TEST16-Prüfungen und Reports bleiben unverändert.
- Solange nicht alle Quellen verifiziert sind, kann `exit code 2` erscheinen; das ist das bekannte, beabsichtigte `UNVOLLSTAENDIG`, nicht ein Beleg für einen Installationsfehler.
- GitHub Scheduled Workflows sind Best-Effort: Verzögerung/Ausfall möglich, z. B. bei GitHub-Last oder deaktivierten Schedules. Ein Cron-Eintrag beweist noch **keinen tatsächlich gelaufenen Tagesjob**.
- Dieser Schritt fügt **keine** LIVE-Veröffentlichung und **keine** automatische Website-Korrektur hinzu.

## Einschränkung / weitere Entwicklung
Portugal: Benfica–Sporting Datum gefunden, Uhrzeit nicht nachgewiesen. Frankreich: PSG–Marseille aus Saisonmeldung, noch kein aktueller strukturierter Live-Spielplan. Der bestehende Browserprüfer steht bei 9/11. Nichts davon wird als 11/11 gemeldet.

## Herkunft / Bestandskontrolle
Ausgangsdatei GitHub `main`, SHA `6e00da83f2cbd1576c23ceb1540f986a72dfffac` (Git Blob), geprüft am 27.10.2026. Falls GitHub Desktop unerwartete weitere Änderungen zeigt: nicht committen.
