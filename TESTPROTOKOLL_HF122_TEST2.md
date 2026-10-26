# HF122-TEST2 – Kompaktes Wochenend-Logbuch / Archivauswahl oben

## Umfang
- Startseite: lange Story-Absätze entfallen zugunsten einer akzentuierten Schlagzeile. Bei Sensation: Mehrheit / richtig / exakt als kompakte Faktenzeile. Bis zu drei Namen der richtig Tippenden werden angezeigt, sonst bleiben die Namen im vollständigen Logbucheintrag abrufbar.
- Kennzahlen weiterhin sichtbar, pro Wettbewerb direkte Verlinkung in den vollständigen Rückblick.
- Logbuchseite: Auswahl „Frühere Einträge“ direkt unter der Kopfkachel, oberhalb des aktuellen Rückblicks.
- Keine Änderungen an JSON-Wertungsdaten oder am Admin.

## Automatisierte Prüfungen
- `node --check logbuch.js`: erfolgreich.
- Reihenfolge Archiv-Auswahl vor `lb-current`: erfolgreich.
- Keine Langtext-Ausgabe mehr in den Startseitenkarten: erfolgreich.
- Vier Dateien mit gegenüber HF122-TEST1 gezielten Änderungen, ZIP-Integrität: erfolgreich.

## Noch zu prüfen
- Test2v2-Darstellung Desktop/Mobil, Hervorhebung, Textüberlauf, Dropdowns, Anklicken der Archivlinks.
- Keine LIVE-Freigabe ohne Test2v2-Bestätigung und separaten LIVE-Abgleich.
