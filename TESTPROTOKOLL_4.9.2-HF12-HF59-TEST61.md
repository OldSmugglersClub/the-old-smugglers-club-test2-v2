# Testprotokoll TEST61

## Festgestellte Ursache

Die Tippverteilungsdaten und der Renderer waren vorhanden. Die Wettbewerbsseiten verwendeten jedoch unterschiedliche alte Cache-Kennungen für `wettbewerb.css`. Dynamo lud einen neueren CSS-Stand; Bundesliga und Champions League konnten ältere CSS-Fassungen verwenden.

## Automatisch geprüft

- Ausgangspaket und Versionsstand HF59: bestanden
- alle acht Wettbewerbsseiten verwenden dieselbe TEST61-CSS- und JavaScript-Kennung: bestanden
- JavaScript-Syntax: bestanden
- Bundesliga: 18 Spiele mit Tippverteilung: bestanden
- Champions League: 6 Spiele mit Tippverteilung: bestanden
- Dynamo/2. Bundesliga: 4 Spiele mit Tippverteilung: bestanden
- Coco-Direktwahl vollständig enthalten: bestanden
- `spieldaten.json`, `spielbetrieb.json`, `website-view.json` und `highscore.json` bytegleich zum neu hochgeladenen Ausgangsstand: bestanden

## Sichtprüfung

1. Bundesliga: abgeschlossenen Spieltag öffnen und Tippverteilung prüfen.
2. Champions League: Tippverteilung unter den sechs beendeten Dienstagsspielen prüfen.
3. Dynamo: bisher funktionierende Darstellung gegenprüfen.
4. Bei einem kommenden Spiel „Coco fragen“ anklicken und die direkte Vorauswahl prüfen.
