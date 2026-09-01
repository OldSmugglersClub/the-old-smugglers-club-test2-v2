# TEST32 – Highscore-Punktezeile Desktop

## Basis

- `4.9.2-HF12-HF30-TEST31`
- Die hochgeladene Test2-v2-`main.zip` wurde vor der Änderung über `VERSION.txt` als TEST31 bestätigt.

## Änderung

Innerhalb der bestehenden Highscore-Kartenstruktur verwendet `.highscore-card-copy` auf Desktop ein gemeinsames dreizeiliges Grid. Die dynamische Punktezeile aller drei Kacheln wird am unteren Rand derselben Grid-Zeile ausgerichtet. Eine schwarze Trennlinie mit festem Innenabstand trennt Namen beziehungsweise Team vom Zahlenwert.

Die Lösung arbeitet ohne Absolutpositionierung und bleibt unabhängig von den dynamisch geladenen Namen und Zahlenwerten.

## Pflichtprüfung

1. Desktop mit mindestens 701 px Breite öffnen.
2. Prüfen, dass `23 Punkte`, `10 Punkte` und `14,79 : 13,80 Punkte` vollständig unterhalb der schwarzen Trennlinie stehen.
3. Prüfen, dass alle drei Zahlenwerte exakt auf gleicher Höhe sitzen.
4. Einen längeren Namen beziehungsweise Teamnamen prüfen; die Punktezeile muss ausgerichtet bleiben und darf nicht überlagert werden.
5. Bei 700 px und darunter prüfen, dass die bisherige mobile Darstellung unverändert bleibt.
6. Grid, Kachelgrößen, Navigation und Datenwerte gegen TEST31 gegenprüfen.

## Nicht geändert

- HTML-Struktur
- JavaScript und Datenlogik
- Grid und Kachelgrößen
- Navigation und Grundlayout
- Tablet/Mobile bis einschließlich 700 px
