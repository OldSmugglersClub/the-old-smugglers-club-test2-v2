# TOSMC Quellenwächter – gezielte TEST9-Reparatur

**Grundlage:** Realer GitHub Actions Lauf TEST8, Artifact 12755227560 vom 27.10.2026.

## Gesicherte Befunde

- Serie-A-Antwort von `api-sdp.legaseriea.it/.../matches` enthielt laut Schemaanalyse 380 Einträge mit `home`, `away` und **`matchDateUtc`**. TEST8 las dieses Feld nicht aus und meldete 380 × `ohne Zeitfeld`.
- Der gezielte Fix ergänzt `matchDateUtc` zu den unterstützten UTC-Datumsfeldern, ohne Zeitangaben ohne Zeitzone zu akzeptieren.
- Premier League `/broadcasting/match-events`: TEST8 fand dort keine Paarungen; das ist noch kein nachgewiesener Fixtures-Endpunkt.
- Liga Portugal: Die Seite lieferte verschiedene andere API-Antworten; der von TEST8 gesuchte `/api/v1/competition/matches`-Endpunkt wurde in diesem Lauf **nicht beobachtet**.
- Ligue 1 weiter ohne erkannten Match-Datenabruf.
- Resultat TEST8 war 0/11 verifizierte Spiele; bei TEST9 ist der Erfolg mit echten API-Daten **noch unbestätigt**.

## Installation ausschließlich im bestehenden Test2v2

1. `scripts/offizielle-liga-adapter.mjs` ersetzen.
2. `scripts/TEST_offizielle_quellen_TEST9.mjs` ergänzen.
3. Optional den neuen Test mit `node scripts/TEST_offizielle_quellen_TEST9.mjs` lokal prüfen.
4. Danach den **bestehenden** GitHub Actions Diagnoseworkflow einmal ausführen. Seine unveränderte Browser-Logik lädt den reparierten Adapter automatisch.

Keine Workflow-Änderung, kein zusätzliches Repository, kein GitHub-Zugriff mit Schreibrechten durch KI, keine Änderung an `spieldaten.json`, Tipps, Ergebnissen, Wertungen oder LIVE.

**Grenze:** Wenn `matchDateUtc` im Live-JSON kein vollständiger ISO-Zeitstempel mit Zeitzone ist, bleibt die Quelle bewusst unverifiziert. Die Diagnose muss dann die tatsächliche Feldform ausweisen, bevor ein weiterer Fix erfolgt.
