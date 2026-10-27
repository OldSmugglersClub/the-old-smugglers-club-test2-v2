# TOSMC TEST10 – Serie-A-Teamzuordnung / sichtbare Belegdaten

Stand: 27.10.2026. Grundlage: GitHub-Actions-Lauf #5, Artifact 12757811208. **Nur Test2v2, nicht LIVE.**

## Nachgewiesen
- TEST9 hat 190 Serie-A-Datensätze als terminierte Begegnungen extrahiert.
- Die drei TOSMC-Spiele `pk-2026-27-02-madonnina`, `pk-2026-27-04-ditalia`, `wr-2026-27-05` wurden weiterhin `KEIN_EINDEUTIGES_SPIEL` gemeldet.
- **Noch nicht nachgewiesen:** Welche Teambezeichnungen die tatsächlich extrahierten 190 Spiele verwenden und ob darunter die angefragten drei Spiele sind. TEST10 ergänzt deshalb eine begrenzte, lesende Belegliste.

## Dateien im ZIP und Installation in Test2v2
1. `terminwaechter/offizielle-quellen.json`: nur vier vorhandene Team-Alias-Einträge (AC Milan, Inter, Juventus, Bologna) erweitert; Rest wie TEST9-Basis Datenversion 82. **Vor Ersatz sicherstellen, dass Datenversion und übrige Konfiguration im Test2v2-Repository unverändert sind.** Falls die Konfiguration sich verändert hat, nur die vier Alias-Einträge übertragen.
2. `scripts/offizielle-quellen-browser.mjs`: bestehende Datei ersetzen; gibt für Italien zusätzlich die Namen und Termine von bis zu 100 relevanten, extrahierten Liga-Spielen im Bericht aus, um die tatsächlichen Matches zu diagnostizieren. Sonst unveränderter TEST9-Prüfweg.
3. `scripts/TEST_offizielle_quellen_TEST10.mjs`: neu. Testet synthetische Alias-, Datums-, Heimausrichtung-, Mehrdeutigkeits- und Fehlfall-Szenarien.

Test ausführen: `node scripts/TEST_offizielle_quellen_TEST10.mjs`. Anschließend den bestehenden manuellen Test2v2-Diagnoseworkflow ausführen. Das Artefakt `BROWSER_QUELLEN_BERICHT.json` unter `quellen[].italienBelege` enthält dann die vom Liga-Endpunkt tatsächlich extrahierten Namen, sofern geliefert.

## Grenzen
- Keine offizielle Seite wird von diesem Patch geändert, keine Website-Terminkorrektur, keine GitHub-Aktion durch KI.
- Die synthetischen Alias-Tests (6/6) belegen **keine** tatsächliche 3/3-Quellenverifizierung. Paarungen, die der offizielle Datenbestand nicht enthält oder nur ohne Zeitzone führt, bleiben unverifiziert.
- Bundesliga-, CL-, Smuggler- und Kicktipp-Bestand sowie LIVE bleiben unverändert.
- Ein erfolgreiches Verifizieren in diesem Schritt ist **nur Diagnose**, noch keine automatische tägliche Terminpflege.
