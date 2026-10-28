# TOSMC TEST2v2: gezielte Anstoßzeitpunkt-Prüfung – Vorschlag 3

**Nur TEST2v2, keine Simulation, kein Admin, keine LIVE-Änderungen.**

## Ziel

Einmalige offizielle Quellenprüfung für exakt die 11 offenen Piratenkodex-/Weihnachtsregatta-Spiele. Es werden nur Datum und Uhrzeit geprüft; der Workflow ist **read-only**. Fremde und bereits abgeschlossene Spiele sowie unbestätigte Ansetzungen sind gesperrt.

## Einspielen

1. ZIP entpacken.
2. Die Ordner `.github`, `scripts` und `terminwaechter` in die Wurzel des **lokalen** `the-old-smugglers-club-test2-v2`-Repositories kopieren. Dateien mit gleichem Namen nur bei genau diesen beigefügten Dateien ersetzen.
3. GitHub Desktop: Änderungen kontrollieren, Commit erstellen und `Push origin`.
4. GitHub → **Aktionen** → **TOSMC TEST2v2 – 11 Anstosszeitpunkte pruefen (nur Vorschau)** → **Workflow ausführen**, Branch `main`.
5. Nach Abschluss: Artefakt `TOSMC-TEST2V2-11-ANSTOSSZEITPUNKTE` herunterladen oder GitHub-Laufnummer mitteilen. Ich prüfe dann die echten Daten und alle Schutzbefunde.

## Verbindliche Grenzen

- Kein Zeitplan / kein automatischer täglicher Start in dieser ersten TEST2v2-Stufe.
- GitHub-Token besitzt nur `contents: read` – der Workflow kann **nicht committen**.
- `spieldaten.json`, `schedule-terminstand.json`, Website-/Logbuch-/Admin-Dateien bleiben vollständig unverändert.
- Nur elf feste Spiel-IDs, kein EL, DFB, CL, Bundesliga, Relegation oder Smugglerauftrag.
- Der Quellabruf kann technisch eine größere Ligaantwort lesen, wertet aber ausschließlich die elf konkreten Spiele aus. Dies ist eine offen ausgewiesene Grenze des bestehenden offiziellen Quellenadapters.
- Abweichungen über 56 Tage werden dokumentiert, aber nicht zur Übernahme geplant.
- Quellen mit unbekannter Uhrzeit oder nicht fixierter Begegnung werden nicht als amtlicher Anstoß übernommen.
- Vor einem späteren Schreibworkflow ist eine **separate** fachliche Freigabe nötig. TEST2v2 → Prüfung → Freigabe → LIVE.

**Die einzige neue Website-Verhaltensänderung ist noch keine:** dieses Paket führt nur eine sichere Prüfung aus.
