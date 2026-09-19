TOSMC Test2v2 TEST12

Europa-League OpenLigaDB-Fix

Geändert:
- Matchdaten-Endpoint: /getmatchdata/uel/2026 -> /getmatchdata/uel2026/2026
- Torjäger-Endpoint: /getgoalgetters/uel/2026 -> /getgoalgetters/uel2026/2026
- Cache-Buster in europa-league.html
- VERSION.txt

Sicherheitsumfang:
- keine JSON-Dateien
- keine Wertungsdaten
- keine Hall-of-Fame-Daten
- keine Historien-Daten
- keine Admin-Dateien
- keine Logik anderer Wettbewerbe verändert

Erwartete Wirkung:
- Europa-League-Torjäger wird aus der aktuellen 2026/27-Liga geladen
- Europa-League-Tabelle erscheint, sobald die vorhandenen OpenLigaDB-Daten die
  bestehende 36-Team-Schutzprüfung erfüllen
- Europa-League-Formtabelle nutzt dieselbe korrigierte Matchdatenquelle
