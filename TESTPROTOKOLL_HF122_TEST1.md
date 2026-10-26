# TOSMC Website – HF122-TEST1 Wochenend-Logbuch

## Zweck
Startseite zeigt alle abgeschlossenen Spieltagsgeschichten des jüngsten abgeschlossenen Freitags-bis-Sonntags-Wochenendes. Maßgeblich sind Spieltermine aus `spieldaten.json`, nicht Export- oder Uploadzeiten. Die individuelle Archivansicht bleibt bestehen.

## Geänderte Dateien (nur Website-Code)
- index.html – Abschnittsüberschrift und CSS/JS-Cachekennung
- logbuch.html – CSS/JS-Cachekennung für direkte Archivlinks
- logbuch.js – Wochenende berechnen, Karten erstellen, zielgenauen Archivlink auswählen
- logbuch.css – responsives Raster und Gestaltung

Keine JSON-Wertungsdaten geändert, keine Admin-Dateien geändert.

## Automatisierte statische Tests
- JavaScript-Syntax: `node --check`: BESTANDEN.
- Fachdatentest mit den am 26.10.2026 freigegebenen LIVE-Upload-Daten von Smugglerauftrag Kurs (20 Logbucheinträge): BESTANDEN.
- Wochenende 23.–25.10.2026: genau 3 Karten, Bundesliga 7, Piratenkodex I, Smugglerauftrag Kurs: BESTANDEN.
- Jede Karte mit direktem, URL-kodiertem Archivlink: BESTANDEN.
- Überraschung Barcelona – Real Madrid bleibt als Geschichte vorhanden: BESTANDEN.

## Noch erforderlich vor LIVE
1. Vier Dateien ausschließlich in Test2v2 einspielen, Commit/Push durch Nutzer.
2. Desktop/Mobil: 3 Karten und Inhalt, Textüberlauf, Papagei/Optik und Links prüfen.
3. Test späterer Wochenenden (nur ein Wettbewerb, vier Wettbewerbe) und Archivnavigation prüfen.
4. LIVE-Version mit dann aktueller LIVE `main.zip` gegen aktuellen Code diffen; keine Altdateien blind überschreiben.
5. Gesonderte LIVE-Prüfung und Freigabe.

## Hinweis
Zunächst reine TEST-Version. Kein LIVE-Push und keine produktiven JSON-Daten ersetzen.
