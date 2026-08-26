# The Old Smugglers Club – Website 4.9.2-HF10-TEST2

Ausgangsbasis: Website 4.9.2-HF10-TEST1, ursprünglich Website 4.9.2-HF9.

Diese Testversion korrigiert ausschließlich die bereits freigegebene Startseiten-Kachel „Spieltags-Logbuch“.

## Korrekturen
- zusätzlicher vertikaler Abstand zwischen großer Kennzahl und Unterzeile, insbesondere bei „39 / lagen daneben“
- identische Korrektur für Desktop und Mobile
- die in HF10 eingeführten Teaser-Regeln sind nun ausdrücklich auf `.logbook-teaser` gekapselt

## Nicht geändert
- eigentliche Logbuch-Seite und deren Detaildarstellung
- `logbuch.js` / Datenlogik
- Grid und Kachelgröße
- Navigation
- CTA und Geschichte des Spieltags
- Kicktipp-/Wertungslogik
- Datenquellen

Die Detaildarstellung wurde gegen HF9 kontrolliert; deren Renderlogik bleibt unangetastet.
