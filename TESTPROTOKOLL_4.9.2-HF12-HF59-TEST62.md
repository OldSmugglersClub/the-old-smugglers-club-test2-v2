# Testprotokoll TEST62

## Nachgewiesene Ursache

Die sichtbare CL-Ligaphasenansicht wird separat aus OpenLigaDB aufgebaut. Beim bisherigen Umwandeln wurden Teams, Termine und Ergebnisse übernommen, das Feld `tippverteilung` aus dem zentralen TOSMC-Spiel jedoch nicht. Bundesliga und Dynamo verwenden einen anderen Rendererpfad und waren deshalb nicht betroffen.

## Automatisch geprüft

- JavaScript-Syntax: bestanden
- CL-Verknüpfung verwendet die OpenLigaDB-Match-ID: bestanden
- sechs zentrale CL-Spiele mit vollständiger Tippverteilung vorhanden: bestanden
- alle sechs IDs sind eindeutig und besitzen einen numerischen OpenLigaDB-ID-Anteil: bestanden
- Tippverteilung wird in das CL-Anzeigeobjekt übernommen: bestanden
- alle acht Wettbewerbsseiten verwenden dieselbe TEST62-Kennung für `wettbewerb.js`: bestanden
- CSS-Kennung bleibt auf allen acht Seiten einheitlich: bestanden
- produktive JSON-Daten bytegleich zum neu hochgeladenen TEST61-Ausgangsstand: bestanden

## Sichtprüfung

1. Champions League öffnen; der 1. Spieltag ist aufgeklappt.
2. Unter jedem der sechs beendeten Dienstagsspiele muss die Tippverteilung erscheinen.
3. Bundesliga, 2. Spieltag, und Dynamo stichprobenartig gegenprüfen.
4. Bei einer kommenden CL-Partie „Coco fragen“ prüfen.
