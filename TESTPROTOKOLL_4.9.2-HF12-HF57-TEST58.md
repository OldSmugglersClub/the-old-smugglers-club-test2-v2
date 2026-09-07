# Testprotokoll TEST58

## Ergebnis

- ZIP-Ausgangsbasis `the-old-smugglers-club-main(9).zip` fehlerfrei entpackt.
- JavaScript-Syntax von `coco/coco.js` und `coco/coco-engine.js` fehlerfrei.
- Wettbewerbsauswahl programmatisch geprüft: exakt acht konfigurierte Wettbewerbe in der vorgesehenen Reihenfolge.
- Technische 2.-Bundesliga-ID wird korrekt als „Dynamo Dresden“ beschriftet.
- CL-Testspiel aus der optionalen OpenLigaDB-Quelle wird dem „1. Spieltag“ zugeordnet und als Partie auswählbar.
- Ausfall optionaler CL-/EL-/DFB-Quellen blockiert die lokalen Coco-Daten nicht.
- Vorhandene `spieldaten.json`, Wertungsdateien und Coco-Orakel-Engine unverändert.

## Noch durch den Nutzer in Test2v2 zu prüfen

- Auswahlfeld zeigt alle acht Wettbewerbe.
- Bundesliga und Dynamo Dresden funktionieren unverändert.
- Ein Wettbewerb ohne Partie in den nächsten sieben Tagen bleibt auswählbar; Runde und Partie bleiben mangels aktuell befragbarer Begegnung leer.
- Sobald CL-, EL- oder DFB-Spiele von OpenLigaDB terminiert und innerhalb des Sieben-Tage-Fensters liegen, erscheinen Runde und Partie automatisch.
- Desktop- und Mobilansicht ohne Überlagerungen.

