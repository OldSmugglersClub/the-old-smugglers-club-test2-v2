# TEST34 – Highscore-Namen zentriert

## Basis

- Test2-v2 `4.9.2-HF12-HF30-TEST33`
- TEST33 wurde vom Nutzer abgenommen.

## Änderung

Die Namen beziehungsweise Teamnamen in der mittleren Zeile der drei Highscore-Kacheln werden auf Desktop innerhalb des vorhandenen Textbereichs horizontal zentriert. Dafür wird die bestehende gemeinsame `strong`-Regel um Flex-Zentrierung, volle Breite und zentrierte Textausrichtung ergänzt.

Es gibt weiterhin keine Absolutpositionierung und keine individuellen Kachelkorrekturen.

## Pflichtprüfung

1. Desktop mit mindestens 701 px Breite öffnen.
2. Prüfen, dass die Namen in allen drei Kacheln horizontal zentriert erscheinen.
3. Kurze und lange Namen sowie Teamnamen prüfen.
4. Prüfen, dass Überschriften und Punktewerte weiterhin auf identischer Höhe sitzen.
5. Prüfen, dass keine schwarzen Querstreifen sichtbar sind.
6. Bei 700 px und darunter prüfen, dass die mobile Darstellung unverändert bleibt.

## Nicht geändert

- HTML-Struktur
- JavaScript und Datenlogik
- Grid und Kachelgrößen
- Navigation und Grundlayout
- Tablet/Mobile bis einschließlich 700 px
