# CHANGELOG 4.9.2-HF12-HF52-TEST65

## Grundlage
- Korrektur auf Basis der bestätigten Live-Version `4.9.2-HF12-HF52`.

## Inhalt
- Saisonübersicht von statischen Sollsummen auf aktuelle Istwerte umgestellt.
- Champions-League-Spielplan wird wie die CL-Kachel direkt aus OpenLigaDB geladen.
- DFB-Pokal und Europa League berücksichtigen aus OpenLigaDB ausschließlich die für die Clubwertung relevanten Runden ab Achtelfinale.
- Bei nicht erreichbarer OpenLigaDB bleibt der lokale Datenbestand als Rückfallweg erhalten.
- Tippspieltage werden aus den tatsächlich angelegten Wertungstagen gezählt.
- Reale Spiele und terminierte Spiele werden aus den aktuell bekannten, eindeutigen Begegnungen berechnet.
- Status und Zeitraum werden je Wettbewerb aus vorhandenen Spielen und Ergebnissen abgeleitet.
- Der Datenstand zeigt den tatsächlichen Prüfzeitpunkt und weist auf teilweise ausgefallene Live-Daten hin.
- Automatische Aktualisierung alle 15 Minuten bei sichtbarer Seite ergänzt.
- Veralteten Cache-Buster `4.7.1-TEST6` entfernt und auf `4.9.2-HF12-HF52-TEST65` angehoben.

## Geänderte Dateien gegenüber HF52
- `saison-2026-2027.html`
- `saisonuebersicht.js`
- `VERSION.txt`
