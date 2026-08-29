# 4.9.2-HF12-HF30-TEST27

TEST27 korrigiert die Darstellung der Bundesliga-Torjäger.

## Verbindliche Fachregel
OpenLigaDB ist für die Reihenfolge maßgebend:
**Der erste Eintrag der OpenLigaDB-Torjägerliste wird als Platz 1 angezeigt.**

Es findet keine eigene Sortierung bei Torgleichstand statt.

## Kachel 1
- Titel `Torjäger`
- lokales Kanonenbild
- darunter der erste OpenLigaDB-Name
- darunter dessen Torzahl

## Kachel 2
- `Torjägerfeld`
- bis zu drei Einträge in unveränderter OpenLigaDB-Reihenfolge
- bei weiteren gleichauf Führenden zusätzlicher Hinweis

## Test
1. UPDATE in Test2-v2 einspielen.
2. Workflow `Bundesliga Ergebnisse – automatisch` ggf. einmal manuell starten.
3. Bundesliga-Seite mit Cache-Neuladung öffnen.
4. Prüfen, dass Kachel 1 Bild + konkreten Namen + Torzahl zeigt.
5. Prüfen, dass der Name exakt dem ersten Eintrag in `bundesliga-torjaeger.json` entspricht.
6. Prüfen, dass Kachel 2 dieselbe Reihenfolge nutzt.
