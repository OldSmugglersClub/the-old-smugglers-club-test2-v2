# 4.9.2-HF12-HF30-TEST26

TEST26 erweitert ausschließlich die beiden vorhandenen Informationskacheln der Bundesliga-Seite um aktuelle Torjägerdaten.

## Datenweg
OpenLigaDB `getgoalgetters/bl1/2026`
→ `scripts/bundesliga-torjaeger-auto.mjs`
→ `bundesliga-torjaeger.json`
→ `wettbewerb.js`
→ bestehende `info-card`-Komponenten.

Die Website selbst ruft OpenLigaDB nicht direkt auf.

## Anzeige
- `Torjäger`: ein allein Führender oder die Anzahl gleichauf Führender.
- `Torjägerfeld`: maximal drei Namen mit Torzahl; weitere Spieler auf gleicher Torzahl werden als `+N weitere gleichauf` kenntlich gemacht.
- Keine nummerierte Rangfolge bei Gleichstand.
- `Datenzentrale` bleibt unverändert.

## Test in Test2-v2
1. UPDATE-Paket manuell in Test2-v2 einspielen.
2. GitHub-Workflow `Bundesliga Ergebnisse – automatisch` einmal manuell starten.
3. Warten, bis der Workflow erfolgreich beendet und ggf. `bundesliga-torjaeger.json` committet hat.
4. `bundesliga.html` mit Cache-Neuladung öffnen.
5. Prüfen, dass `Wertung` und `Saisonstart` durch die Torjägerinformationen ersetzt sind.
6. Prüfen, dass Tabelle, Ergebnis 5:1, Tippverteilung und übrige Website unverändert sind.
7. Bei einem OpenLigaDB-Ausfall müssen neutrale Kacheltexte bleiben; die Seite darf nicht ausfallen.

## Technische Tests
`scripts/tests/bundesliga-torjaeger-test.mjs` prüft Normalisierung, Sortierung, Gleichstände und verhindert eine unnötige Erhöhung der Datenversion bei unveränderten Daten.
