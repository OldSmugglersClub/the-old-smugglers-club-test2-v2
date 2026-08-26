# TOSMC Test2 – „Wer hat’s gerochen?“ Sichtprüfung mit Goldrausch

Stand: 23.08.2026

Dieses Paket ist ausschließlich für Test2 bestimmt.

## Testfall
Der vorhandene reale 2. Tippspieltag / Smugglerauftrag „Goldrausch“ wird zur visuellen Abnahme verwendet:

- Dynamo Dresden – Darmstadt 98: 1:0
- gültige Abgaben: 93
- richtige Tendenz Heimsieg: 36 = 38,7 %
- exakte 1:0-Tipps innerhalb der richtigen Tendenz: 8

38,7 % liegt über der späteren Produktionsgrenze von 25 %. Die Kachel wird in Test2 deshalb **nur über einen klar gekennzeichneten Test-Override** sichtbar gemacht. Tipps und Ergebnis bleiben unverändert.

## Zu prüfen
- „Wer hat’s gerochen?“ erscheint im Logbuch von Goldrausch.
- 36 von 93 / 38,7 % werden korrekt angegeben.
- Namen und Tipps werden korrekt dargestellt.
- Abschnitt funktioniert im historischen Aufruf „2. Tippspieltag · Smugglerauftrag“.
- „Spieltag in 30 Sekunden“ behandelt den neuen Typ als normalen Prioritätskandidaten; maximal drei Highlights bleiben bestehen.
- Desktop und Mobile bleiben im bestehenden Layout.

## Sicherheitsregel
Diese Test-JSON darf niemals nach Live kopiert werden. Produktiv gilt weiterhin ausschließlich die 25-%-Regel.

## Ersetzen
- `logbuch.js`
- `spieltag-logbuch.json`

## Neu
- keine Laufzeitdateien

## Löschen
- keine Dateien
