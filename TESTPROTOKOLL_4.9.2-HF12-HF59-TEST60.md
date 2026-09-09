# Testprotokoll TEST60

## Automatisch geprüft

- ZIP-Ausgangsstand fehlerfrei entpackt: bestanden
- JavaScript-Syntax `wettbewerb.js`: bestanden
- JavaScript-Syntax `coco/coco.js`: bestanden
- 144 Champions-League-Spiele erkannt: bestanden
- sechs abgeschlossene CL-Spiele mit vollständiger Tippverteilung `1 / X / 2`: bestanden
- gemeinsamer Spielrenderer bindet Tippverteilung ein: bestanden
- Coco-Direktlink übergibt Spiel, Wettbewerb, Runde, Heim- und Auswärtsteam: bestanden
- Coco übernimmt die verlinkte Spiel-ID in seine auswählbare Spielmenge: bestanden
- `spieldaten.json`, `spielbetrieb.json`, `website-view.json` und `highscore.json` bytegleich zum geladenen Live-Stand: bestanden

## Sichtprüfung im Test-Repository

1. Champions-League-Seite neu laden. Unter den sechs beendeten Dienstagsspielen muss jeweils „Tippverteilung“ mit `1`, `X`, `2` und der Anzahl abgegebener Tipps erscheinen.
2. Bei einem kommenden CL-Spiel „Coco fragen“ wählen. In Coco müssen Wettbewerb, Runde und genau diese Partie bereits eingestellt sein.
3. Den gleichen Direktaufruf stichprobenartig aus einer weiteren Wettbewerbskachel prüfen.
4. „Zurück zum Spiel“ muss wieder zur ursprünglichen Partie springen.
