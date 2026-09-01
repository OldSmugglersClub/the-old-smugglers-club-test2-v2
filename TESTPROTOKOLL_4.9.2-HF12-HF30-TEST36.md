# Testprotokoll – Test2-v2 4.9.2-HF12-HF30-TEST36

## Technisch geprüft

- JavaScript-Syntax von `website-mitteilung.js`
- JSON-Syntax und Pflichtfelder der Mallorca-Konfiguration
- Einbindung von CSS und JavaScript ausschließlich auf der Startseite
- Beginn 25.09.2026 00:00 Uhr Europe/Berlin
- Ende 28.09.2026 06:00 Uhr Europe/Berlin
- Ende ist exklusiv: ab 06:00 Uhr wird nicht mehr eingeblendet
- Vorschauparameter `?hinweis-vorschau=1`
- Sitzungsbestätigung ist an die Mitteilungs-ID gebunden
- automatische Neuberechnung alle 30 Sekunden
- fehlende, nicht erreichbare oder ungültige JSON-Konfiguration blockiert die Seite nicht
- Text wird mit `textContent` eingesetzt; kein freier HTML-Code
- keine Änderung an Grid, Navigation, Kacheln oder Datenlogik

## Einschränkung der technischen Umgebung

Ein echter Headless-Browsertest war lokal nicht ausführbar, weil kein Browser-Binary installiert ist. Syntax, Datenstruktur, Zeitgrenzen, Einbindung und Paketstruktur wurden unabhängig geprüft. Der verbindliche Sicht- und Bedienungstest erfolgt deshalb durch den Nutzer in Test2-v2.

## Noch durch den Nutzer zu prüfen

- Darstellung mit `?hinweis-vorschau=1` auf Desktop und mobil
- Schließen über „OK“
- normaler Startseitenaufruf ohne Vorschauparameter zeigt vor dem 25.09.2026 keine Mitteilung
- erneuter Aufruf innerhalb derselben Sitzung
- Website bleibt vollständig bedienbar

## Ergebnis

Technisch zur Nutzerprüfung freigegeben. Noch keine fachliche Endabnahme.
