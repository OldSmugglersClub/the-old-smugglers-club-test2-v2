# README – TEST17 Schiffbruch-Intro

Diese Testversion ersetzt ausschließlich das bisherige automatische Start-Intro.

## Testablauf
1. Test2-Seite mit Strg+F5 öffnen.
2. Intro bleibt stehen, bis eine reale Nutzerinteraktion erfolgt.
3. Auf das Rettungsboot / die Szene klicken oder tippen.
4. Prüfen: Audio startet sofort, Bild fährt Richtung Insel, Coco erscheint kurz, anschließend wird die Website freigegeben.
5. Desktop und Mobil prüfen.

## Erwartete Gesamtdauer
Ca. 4,8 Sekunden nach dem Tap.

## Technischer Hinweis
Das Audio wird über die Web Audio API direkt im Browser erzeugt. Dadurch gibt es keine zusätzliche Audio-Datei, keine externe Quelle und keine Lizenzabhängigkeit. Der erste Tap/Klick erfüllt gleichzeitig die Autoplay-Anforderung der Browser.

## Rückbau
Für einen vollständigen Rückbau genügt die Wiederherstellung der TEST16-`index.html` und das Entfernen von `assets/intro/shipwreck-intro.jpg`.
