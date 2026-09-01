# Test2-v2 4.9.2-HF12-HF30-TEST36

## Neu

- Zeitgesteuerte Mitteilung auf der Startseite
- Konfiguration über `website-mitteilung.json`
- Bestätigung über frei beschriftbaren Button
- automatische Prüfung in der Zeitzone Europe/Berlin
- automatische Aktivierung und Deaktivierung bei geöffnet gebliebener Seite
- Vorschau unabhängig vom Zeitraum mit `?hinweis-vorschau=1`

## Bestandsschutz

- Website bleibt bei fehlender oder ungültiger Konfiguration zugänglich.
- Keine Änderung an Grid, Navigation, Kacheln oder Datenlogik.
- Die Meldung erscheint einmal pro Browser-Sitzung und Mitteilungs-ID.
