# Test2-v2 TEST36 – Website-Mitteilung testen

Die Mallorca-Mitteilung ist für den 25.09.2026 00:00 Uhr bis 28.09.2026 06:00 Uhr in Europe/Berlin vorkonfiguriert.

## Test vor dem Zeitraum

Startseite mit `?hinweis-vorschau=1` öffnen. Beispiel:

`https://DEINE-TEST-ADRESSE/?hinweis-vorschau=1`

Die Vorschau zeigt die reale Konfiguration unabhängig vom Datum. Nach einem normalen Aufruf ohne diesen Parameter erscheint sie nur innerhalb des konfigurierten Zeitraums.

## Verhalten

- „OK“ schließt die Einblendung.
- Im normalen Betrieb bleibt sie für die aktuelle Browser-Sitzung geschlossen.
- Eine neue Mitteilungs-ID wird erneut angezeigt.
- Fehler in der JSON-Datei dürfen den Websitezugriff nicht sperren.
