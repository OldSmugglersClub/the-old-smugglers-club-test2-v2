# TOSMC offizieller Terminwächter TEST7 – Browser-Quellenprüfung

## Hintergrund
TEST5 und TEST6 haben beim direkten HTML-Abruf 0/11 offene Sonderbegegnungen verifiziert. TEST7 erweitert den **bestehenden** manuellen Test2v2-Workflow um einen schreibgeschützten Browser-Diagnoselauf, der die JSON-Antworten der offiziellen Seiten untersucht. Die alten Prüfprogramme und der bisherige HTTP-Test bleiben bestehen.

## Im vorhandenen Test2v2-Repository einspielen
- `.github/workflows/tosmc-test2v2-offizielle-terminquellen-diagnose.yml` **ersetzen** (gleicher Workflow-Name/Pfad; kein weiteres Repository)
- `scripts/offizielle-quellen-browser.mjs` **neu**
- `scripts/TEST_offizielle_quellen_TEST7.mjs` **neu**
- `README_TEST7_EINBAU.md` nur Dokumentation

Den vorhandenen `scripts/offizielle-quellen.mjs` (TEST6) **nicht** überschreiben. Nach dem Commit den vorhandenen Workflow einmal manuell ausführen. Das bestehende Artifact enthält dann zusätzlich `BROWSER_QUELLEN_BERICHT.json` und `.md`.

## Schutzregeln
- `permissions: contents: read`, Checkout ohne persistierte Credentials.
- Kein Commit/Push, keine Änderung von `spieldaten.json`, keine Abrechnung, keine OpenLigaDB-Abfrage.
- Dynamisch geladene JSON-Antworten werden nur von **freigegebenen offiziellen Domains** ausgewertet. Externe API-Hosts, auch von einer offiziellen Webseite angesprochen, werden vorerst **nicht** als amtliche Quelle übernommen.
- Exakte Paarung und explizite UTC-Zeitzone sind Pflicht. Nicht zuordenbare Spieldaten bleiben als Prüflücke sichtbar.
- Kein kompletter Online-End-to-End-Test in der Entwicklungsumgebung: Headless-Browser-Abrufe müssen durch GitHub Actions verifiziert werden. Der Workflow kann weiterhin mit Exit-Code 2 enden; der Bericht wird trotzdem hochgeladen.
- Playwright und Chromium sind zusätzliche CI-Abhängigkeiten, die auf dem GitHub-Runner installiert werden. Falls die Installation fehlschlägt, ist der Browserlauf ungetestet und der HTTP-Bericht bleibt vorhanden.

## Tests lokal
`node scripts/TEST_offizielle_quellen_TEST7.mjs`

## Offene Punkte
- Die vier offiziellen Webseiten benötigen möglicherweise spezielle Adapter, abweichende Kalender-URLs oder ausdrücklich freigegebene offizielle API-Hosts. Diese müssen erst aus dem Browser-Diagnosebericht abgeleitet und anhand konkreter Begegnungen getestet werden.
- Eine tägliche automatische Terminaktualisierung oder Website-Einspielung ist damit **noch nicht** freigegeben.
