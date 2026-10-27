# TOSMC TEST13 – kontrollierter Portugal-Response-Fix

Stand: 27.10.2026. Nur TEST2v2, **KEINE LIVE-FREIGABE**.

## Nachweis
- GitHub Test2v2 `main`, `scripts/offizielle-quellen-browser.mjs` Git-Blob `28e8f2298bc79e073d3acae1e9f629c52023cee4` per READ-only gelesen.
- TEST12 Artifact `12765027922` / Run `40569123526`: 6/11 geprüft, fünf Abweichungen. Portugal-Antwort: 4.129.050 Bytes, gesperrt durch 2.000.000-Byte-Grenze.

## Änderung
Einzige Änderung in `scripts/offizielle-quellen-browser.mjs`: maximale JSON-Antwortgröße wird **ausschließlich** bei Provider `portugal` UND Pfad `/api/v1/competition/matches` von 2 MB auf 6 MB erhöht. Alle anderen Pfade und Provider verbleiben auf 2 MB. Keine Änderung an Serie A, FPL, Admin, Website, Ergebnissen, Tipps oder LIVE.

## Einspielen (durch Nutzer, nur auf lokale TEST2v2-Kopie)
1. TEST2v2-Repository in GitHub Desktop aktuell halten, keine offenen Änderungen überschreiben.
2. Im Terminal `python apply_test13.py "PFAD_ZUM_TEST2V2_REPO"` ausführen.
3. Bei ABRUCH: nichts erzwingen; aktuelle Datei zur Prüfung bereitstellen.
4. `node --check scripts/offizielle-quellen-browser.mjs` und bestehende Regressionstests durchführen.
5. In GitHub Desktop ausschließlich **eine** geänderte Datei prüfen. Commit und Push nur durch Nutzer.
6. Einmal vorhandenen Diagnoseworkflow manuell starten. Artifact prüfen: Portugal-Antwort `JSON_GELESEN`, Provider-Feldmuster/Fixture-Zahl und bestehende mindestens 6/11. `JSON_GELESEN` allein belegt **keinen** passenden Termin.

## Ausstehend
Portugal-JSON-Schema und konkrete Zuordnung `wr-2026-27-02` sind noch nicht online bestätigt. England (drei Paarungen) und Ligue 1 bleiben ungeklärt. Noch kein täglicher Cron, kein Safe-Apply, keine LIVE-Bereitstellung. `exit 2` darf bei weiter fehlenden Spielen bestehen bleiben.

## Schutzrisiken
Die erlaubte Antwortgröße wird nur an diesem Endpunkt erhöht; `r.body()` lädt den Body bereits vor der Prüfung vollständig in den Speicher. Das ist **kein Streaming-Fix**. Bei über 6 MB bleibt die Antwort gesperrt. Für Produktionsbetrieb sind Laufzeit- und Speichergrenzen gesondert zu prüfen.
