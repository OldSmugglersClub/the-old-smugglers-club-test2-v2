# TOSMC 4.9.2-HF12-HF26-TEST20

## Zweck
Isolierter Funktionstest der offiziellen Kicktipp-JavaScript-Integration auf Test2-v2.

## Aufruf
Nach Installation direkt `kicktipp.html` auf Test2-v2 öffnen. Die bestehende Navigation wurde absichtlich nicht verändert.

## Schutzregeln
1. Kicktipp muss ohne TOSMC vollständig nutzbar bleiben.
2. TOSMC muss ohne Kicktipp vollständig nutzbar bleiben.
3. Das externe Kicktipp-Script wird nur auf `kicktipp.html` geladen.
4. Bestehende Links und Website-Funktionen werden nicht ersetzt.
5. Die Kicktipp-Option "Zugriff sperren" bleibt deaktiviert.

## Kicktipp Einstellungen für den visuellen Test
Die Website ändert diese Einstellungen nicht automatisch. Empfohlen nach erster erfolgreicher Registrierung der Integrationsadresse:
- Kopfzeile in der Integration ausblenden: EIN
- Fußzeile in der Integration ausblenden: EIN
- Menü-Icon zunächst anzeigen lassen
- Backlink auf die TOSMC-Startseite setzen
- Zugriff sperren: AUS

## Testpunkte
- Desktop: Darstellung, Navigation innerhalb Kicktipp, Login, Live-Bereich.
- Mobil: Darstellung, Kicktipp-Menü, Login, Live-Bereich.
- Direkter Kicktipp-Zugang bleibt parallel erreichbar.
- Bei blockiertem/fehlgeschlagenem Kicktipp-Script bleibt TOSMC erreichbar.
