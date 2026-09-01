# TEST33 – Geordnete Highscore-Kacheln Desktop

## Basis

- Test2-v2 `4.9.2-HF12-HF30-TEST32`
- TEST32 war vom Nutzer abgenommen; die anschließende Live-Übernahme HF37 wurde wegen störender schwarzer Querlinien nicht abgenommen.

## Änderung

Die bisherige wiederholte Hintergrundgrafik erzeugte in festen Abständen schwarze Querstreifen. Je nach Inhalt lagen dadurch Namen direkt auf einem Streifen. TEST33 ersetzt diese Hintergrundgrafik auf Desktop durch eine ruhige, durchgängige Leder-/Holzfläche.

Der vorhandene Inhaltscontainer wird als gemeinsames dreizeiliges Grid genutzt:

1. Überschrift
2. Name beziehungsweise Teamname
3. Punktewert

Die Überschrifts- und Punktebereiche erhalten identische Höhen und dezente messingfarbene Trennlinien. Namen und Punkte bleiben dadurch in allen drei Kacheln auf gleicher Höhe, ohne Absolutpositionierung.

## Pflichtprüfung

1. Desktop mit mindestens 701 px Breite öffnen.
2. Prüfen, dass keine schwarzen Querstreifen durch Überschriften, Namen oder Punkte laufen.
3. Prüfen, dass alle drei Überschriftsbereiche auf derselben Unterkante enden.
4. Prüfen, dass alle drei Namen und alle drei Punktewerte jeweils exakt auf gleicher Höhe sitzen.
5. Längere Namen sowie das Auswahlmenü der mittleren Kachel prüfen.
6. Bei 700 px und darunter prüfen, dass die mobile Darstellung unverändert bleibt.
7. Grid, Kachelgrößen, Navigation und Datenwerte gegen TEST32 gegenprüfen.

## Nicht geändert

- HTML-Struktur
- JavaScript und Datenlogik
- Grid und Kachelgrößen
- Navigation und Grundlayout
- Tablet/Mobile bis einschließlich 700 px
