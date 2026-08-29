# 4.9.2-HF12-HF30-TEST25

Testversion auf Grundlage des bestätigten Test2-v2-Stands `4.9.2-HF12-HF30-TEST24` inklusive Bundesliga-Teilstand 1/9.

## Ziel

Die drei rechtlichen Footer-Kacheln `Impressum`, `Datenschutz` und `Nutzungsrechte` müssen auch auf Viewports zwischen 621 und 720 CSS-Pixel einen vollständig geschlossenen goldenen Rahmen zeigen.

## Technische Umsetzung

In `legal.css` wurde ausschließlich der bestehende HF22-Breakpoint für die untere Rahmenfarbe von `max-width: 620px` auf `max-width: 720px` angehoben.

Damit entspricht die Korrektur exakt dem bereits vorhandenen Bereich, in dem die mobile Navigationsregel den vollständigen Rahmen für `nav a` aktiviert.

Keine Geräteerkennung, keine Teclast-Sonderregel und keine Änderung an Größen oder Layout.

## Installation in Test2-v2

1. UPDATE-Paket in `OldSmugglersClub/the-old-smugglers-club-test2-v2`, Branch `main`, manuell übernehmen.
2. `legal.css` und `VERSION.txt` ersetzen.
3. Die TEST25-Dokumente neu hinzufügen.
4. Keine Dateien löschen.
5. Testseite mit Strg+F5 beziehungsweise Browser-Cache-Neuladung öffnen.

## Pflichtprüfungen

- Teclast P30: untere goldene Linie bei allen drei Footer-Kacheln sichtbar.
- Android-Smartphone <= 620 CSS-Pixel: Darstellung unverändert korrekt.
- Viewport 621–720 CSS-Pixel: vollständige Rahmenlinie.
- Viewport > 720 CSS-Pixel: keine neue mobile Rahmenwirkung.
- Desktop: unveränderte Darstellung.
- Linkziele `Impressum`, `Datenschutz`, `Nutzungsrechte` prüfen.
- Bundesliga-Teilstand 1/9 und übrige Website-Funktionen bleiben unverändert.

`LiveAdmin`, `TestAdmin` und Live-Website werden nicht verändert.
