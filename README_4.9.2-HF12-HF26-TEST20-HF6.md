# README – TEST20-HF6

Zweck dieses Hotfix-Tests ist ausschließlich die Startnavigation der integrierten Kicktipp Live Action.

Die öffentlichen Live-Action-Links öffnen nun:

`kicktipp.html?path=tippuebersicht&br_p=%2Fthe-old-smugglers-club%2Ftippuebersicht`

Der `br_p`-Wert entspricht exakt dem Parameter, den Kicktipp beim funktionierenden manuellen Wechsel zur Tippübersicht selbst in der Integrations-URL erzeugt hat.

## Test
1. UPDATE in Test2-v2 installieren.
2. Browser hart neu laden.
3. Auf „Kicktipp Live Action“ klicken.
4. Prüfen, ob die eingebettete Ansicht direkt mit „Tippübersicht“ startet.
5. Direkten Kicktipp-Fallback und übrige Clubseite kurz gegenprüfen.

Keine Freigabe für Live. TEST20 bleibt aktiv.
