# README – 4.9.2-HF12-HF26-TEST20-HF4

Testversion auf Basis TEST20-HF3.

## Ziel
Alle bisherigen funktionalen Kicktipp-Verweise der Website führen nun über die isolierte TOSMC-Integration und heißen `Kicktipp Live Action`.

## Startziel
Die Integration verwendet `/tippuebersicht` als gewünschtes Ziel. Zusätzlich enthält die Testseite eine DOM-basierte Nachsteuerung auf `Tippübersicht`, falls Kicktipp den URL-Startparameter nicht selbst übernimmt.

## Sicherheit
Das externe Kicktipp-Script wird weiterhin ausschließlich in `kicktipp.html` geladen. Die Clubseite bleibt unabhängig. Der direkte Kicktipp-Link auf der Integrationsseite bleibt erhalten.

## Test
1. Einen beliebigen `Kicktipp Live Action`-Button aufrufen.
2. Prüfen, ob die Integration direkt die Tippübersicht zeigt.
3. Desktop und Mobil prüfen.
4. Direkten Kicktipp-Fallback prüfen.
