# TOSMC Test2v2 – offizieller Quellenwächter TEST12 (gezielte Nachweisdiagnose)

## Stand
Basiert auf echtem TEST11-GitHub-Bericht vom 27.10.2026 (6/11 verifiziert). Kein eigenständiger Terminabschluss, keine automatische Website-Korrektur. Ziel ist die genaue Ursache der fünf nicht verifizierten Begegnungen, ohne bereits erfolgreiche Quellen umzubauen.

## Installation NUR Test2v2
1. `scripts/offizielle-quellen-browser.mjs` ersetzen.
2. `scripts/TEST_offizielle_quellen_TEST12.mjs` neu hinzufügen.
3. Bestehenden Workflow **TOSMC TEST2v2 – Offizielle Terminquellen (nur Diagnose)** manuell ausführen.
4. Artifact `tosmc-test2v2-offizielle-quellen-diagnose` sichern. Daraus `BROWSER_QUELLEN_BERICHT.json` auswerten.

**Keine Änderungen** an `spieldaten.json`, `terminwaechter/offizielle-quellen.json`, GitHub-Workflows, Bundesliga/CL/Dynamo, Kicktipp, Admin oder LIVE. GitHub-Schreibrechte für das Diagnoseprogramm nicht erforderlich.

## Was TEST12 diagnostiziert
- Bei **englischen nicht gefundenen TOSMC-Paarungen** `paarungsDiagnose`: genau diese Heim-Auswärtspaarung gefunden? Nur die Gegenpaarung gefunden? Eindeutige Belege zu dieser Paarung? Anzahl der Spiele mit beteiligten Teams? **Ein Rückspiel wird niemals als Beweis für das angelegte Heimspiel gewertet.**
- Beim **Portugal-Endpunkt** `/api/v1/competition/matches`: `antwortDiagnose` liefert nur Pfad, HTTP-/JSON-Status, Byteanzahl, Root-Datentyp und höchstens 25 oberste Schlüsselnamen. Keine sensitiven Daten oder vollständige Antwortkörper.
- Bestehende offizielle Serie-A- und FPL-Adapter bleiben unverändert. Frankreich weiterhin offener Quellenadapter.

## Status und Schutz
Nur Diagnose, kein automatisches Übernehmen von Änderungen. Fehlende oder widersprüchliche Begegnungen bleiben unverifiziert; Exit-Code 2 bleibt, solange nicht alle prüfbaren TOSMC-Spiele verifiziert sind. Die aus dem letzten Lauf bekannten **6/11** sind keine Garantie für den nächsten Lauf.

## Lokale Tests
TEST8: 15/15, TEST9: 10/10, TEST10: 6/6, TEST11: 9/9, TEST12: 9/9 Assertions bestanden. `node --check` bestanden. Echte GitHub-Onlineprüfung mit TEST12 steht aus.
