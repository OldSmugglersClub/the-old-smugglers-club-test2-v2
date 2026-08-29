# 4.9.2-HF12-HF30-TEST28

TEST28 bereinigt ausschließlich die zweite Bundesliga-Torjägerkachel.

## Verbindliche Anzeige
- `Torjäger`: ausschließlich OpenLigaDB-Platz 1.
- `Verfolgerfeld`: ausschließlich OpenLigaDB-Platz 2 bis 5.
- Keine eigene Sortierung.
- Keine Wiederholung von Platz 1.
- Keine Anzeige über Platz 5 hinaus.

## Test in Test2-v2
1. UPDATE-Paket manuell einspielen.
2. Bundesliga-Seite mit Cache-Neuladung öffnen.
3. Prüfen, dass Kachel 1 weiterhin Bild + Platz 1 + Torzahl zeigt.
4. Prüfen, dass Kachel 2 `Verfolgerfeld` heißt.
5. Prüfen, dass dort nur die Plätze 2, 3, 4 und 5 erscheinen.
6. Prüfen, dass die Reihenfolge exakt `bundesliga-torjaeger.json` entspricht.
7. Prüfen, dass Platz 1 in der zweiten Kachel nicht erneut erscheint.
