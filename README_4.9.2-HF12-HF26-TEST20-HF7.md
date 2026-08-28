# TEST20-HF7

Gezielter Konsistenztest für `update_data.py` auf Test2-v2.

## Zweck

Das Skript muss bei seiner Ausführung den bereits mit TEST20-HF6 erfolgreich getesteten Kicktipp-Live-Action-Link erzeugen:

`./kicktipp.html?path=tippuebersicht&br_p=%2Fthe-old-smugglers-club%2Ftippuebersicht`

## Installation und Test

1. UPDATE in Test2-v2 installieren.
2. `update_data.py` ausführen.
3. Kontrollieren, dass der erzeugte `kicktippLink` den vollständigen `br_p`-Parameter enthält.
4. Test2-v2 hart neu laden.
5. „Kicktipp Live Action“ anklicken und prüfen, dass weiterhin direkt die Tippübersicht geöffnet wird.
6. Direkten Kicktipp-Fallback kurz gegenprüfen.

Noch keine Live-Freigabe. TEST20 bleibt aktiv, bis der Nutzer HF7 ausdrücklich bestätigt.
