# TOSMC TEST11 – Offizielle Terminquellen (TEST2v2, Diagnose)

## Zweck
Gezielte Erweiterung des bereits installierten manuellen Test2v2-Diagnoseworkflows. **Kein LIVE, kein Spieltagsabschluss, keine Änderung an spieldaten.json, kein neuer Workflow, kein weiteres Repository.** Der durch TEST10 nachgewiesen funktionierende Serie-A-Adapter wird in seiner Serie-A-Logik nicht verändert.

## Einbau in bestehendes Test2v2-Repository
Die Ordnerstruktur des ZIP beibehalten:

1. `scripts/offizielle-quellen-browser.mjs` – vorhandene Datei ersetzen.
2. `scripts/offizielle-premierleague-fpl.mjs` – neu hinzufügen.
3. `scripts/offizielle-liga-adapter.mjs` – vorhandene Datei ersetzen (nur Portugal-Endpunkterkennung präzisiert).
4. `terminwaechter/offizielle-quellen.json` – vorhandene Datei **nur dann ersetzen, wenn `spieldaten.json` noch `datenVersion: 82` hat** und sonstige lokale Konfigurationsanpassungen nicht verlorengehen; andernfalls die geänderte Ligue-1-URL und PL-Aliasnamen in die neuere Konfiguration übertragen.
5. `scripts/TEST_offizielle_quellen_TEST11.mjs` – neu hinzufügen.

`spieldaten.json`, die Bundesliga-/CL-/Dynamo-Workflows, Spielwertung und andere Dateien nicht verändern. GitHub Desktop: ausschließlich ins bestehende **Test2v2** committen und pushen. Anschließend wie bisher einmal **TOSMC TEST2v2 – Offizielle Terminquellen (nur Diagnose)** manuell starten. Das Artifact wird auch bei Exit-Code 2 hochgeladen; es ist kein LIVE-Freigabekriterium.

## Tatsächlich neuer Prüfweg
- Premier League: Offizielle FPL-Endpunkte `https://fantasy.premierleague.com/api/fixtures/` und `https://fantasy.premierleague.com/api/bootstrap-static/`, Team-IDs zu Namen, ISO-UTC nach `Europe/Berlin`. Ausschließlich im England-Prüfschritt und ausschließlich lesend. Keine OpenLigaDB-Abfrage.
- Liga Portugal: der bereits in TEST10 beobachtete `/api/v1/competition/matches`-JSON-Endpunkt wird in den begrenzten Browserantworten bevorzugt berücksichtigt; sein *tatsächliches* Datenschema ist noch nicht bestätigt.
- Ligue 1: statt der Homepage die offizielle Kalenderseite `https://ligue1.com/en/calendar/ligue1`. Ob der Browser dort maschinenlesbare Zeitstempel liefert, ist noch nicht bestätigt.
- Serie A: bestehende TEST10-Funktion, unberührt.

## Beleglage, kein Überversprechen
Lokal 40/40 Tests der TEST8–11-Suiten bestanden (15+10+6+9), JavaScript-Syntax geprüft. Die tatsächliche FPL-Antwort konnte als öffentliche JSON-Quelle über die Webrecherche nachgewiesen werden; ein vollständiger Test gegen die elf TOSMC-Paarungen im GitHub-Runner steht noch aus. Bis dahin bleiben Meldungen zu nicht verifizierten Spielen **UNVOLLSTAENDIG**.

## Versionsschutz
Die Konfiguration enthält `datenVersionErwartet: 82`. Bei einer neueren Test2v2-Datenversion die alte JSON-Datei nicht ungeprüft überschreiben. Beim nächsten offiziellen Website-Datenupdate müssen die Quell-IDs und das Version-Feld neu geprüft werden.
