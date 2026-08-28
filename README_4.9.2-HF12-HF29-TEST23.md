# 4.9.2-HF12-HF29-TEST23

Testversion auf Grundlage der aktuellen Live-Version `4.9.2-HF12-HF29`.

## Ziel

Der dekorative Rahmen der Kicktipp-Integration soll auf Seiten mit kurzem Inhalt nicht mehr durch eine feste Iframe-Mindesthöhe unnötig weit nach unten reichen.

## Änderung

Nur die CSS-Zeile `min-height: 720px` des unmittelbar eingebetteten Kicktipp-Iframes wurde entfernt. Die bestehenden Mindesthöhen des äußeren Rahmens bleiben zunächst erhalten.

## Installation in Test2-v2

1. UPDATE-Paket in `OldSmugglersClub/the-old-smugglers-club-test2-v2`, Branch `main`, übernehmen.
2. `kicktipp.html` und `VERSION.txt` ersetzen.
3. Die drei neuen TEST23-Dokumente hinzufügen.
4. Keine Dateien löschen.
5. Testseite hart neu laden.

## Prüfpunkte

- Mobile Tippübersicht bis zum unteren Ende öffnen.
- Prüfen, ob der Rahmen deutlich näher hinter dem letzten von Kicktipp ausgegebenen Inhalt endet.
- Prüfen, ob kein Inhalt abgeschnitten wird, insbesondere Navigation, Seitenwechsel und „Archivierte Tippsaisons“.
- „Zur Clubseite“, „Frage Coco“ und „Kicktipp direkt“ testen.
- Weitere Kicktipp-Seiten stichprobenartig öffnen.

`LiveAdmin` und sämtliche Admin-Dateien werden nicht verändert. Noch keine Live-Freigabe.
