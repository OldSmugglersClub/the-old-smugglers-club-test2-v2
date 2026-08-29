# 4.9.2-HF12-HF30-TEST29

TEST29 verbessert ausschließlich die Darstellung des `Verfolgerfelds`.

## Ziel
Die Plätze 2 bis 5 werden:
- jeweils untereinander,
- sauber zentriert,
- über die vorhandene Kachelfläche verteilt,
- in unveränderter OpenLigaDB-Reihenfolge angezeigt.

## Test
1. UPDATE in Test2-v2 einspielen.
2. Bundesliga-Seite mit Cache-Neuladung öffnen.
3. `Verfolgerfeld` prüfen:
   - Platz 2–5 jeweils eigene Zeile,
   - keine Fließtextdarstellung,
   - optisch mittig in der Kachel,
   - Platz 1 nicht enthalten,
   - keine Anzeige ab Platz 6.
4. Torjäger-Kachel und übrige Website gegenprüfen.
