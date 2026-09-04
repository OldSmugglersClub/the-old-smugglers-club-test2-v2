# CHANGELOG 4.9.2-HF12-HF53-TEST66

## Grundlage
- Weiterentwicklung des dynamischen Saisonübersichtsstands `4.9.2-HF12-HF53`.

## Inhalt
- Der bisher nicht zugeordnete Final-Spieltag 104 ist jetzt das DFB-Pokal-Finale.
- Das Champions-League-Finale ist als zusätzlicher Wertungsspieltag 105 angelegt.
- DFB-Pokal und Europa League verwenden jetzt dieselbe vollständige Ziel-/Fortschrittslogik ab Achtelfinale.
- Zielumfang DFB-Pokal: 4 Tippspieltage und 15 Spiele.
- Zielumfang Europa League: 7 Tippspieltage und 15 Spiele.
- Zielumfang Champions League: 17 Tippspieltage und 189 Spiele (Ligaphase bis Finale).
- Die bestehenden Tippspieltagnummern 1 bis 103 bleiben unverändert.
- Die Countdown- und Einzelkachellogik bleibt unverändert; neue Finalspiele werden erst nach vorhandener Spielzuordnung und bestätigtem Anstoß berücksichtigt.
- Cache-Buster und `VERSION.txt` auf `4.9.2-HF12-HF53-TEST66` angehoben.

## Geänderte Dateien
- `wettbewerbe.json`
- `tippspieltage.json`
- `saisonuebersicht.js`
- `saison-2026-2027.html`
- `VERSION.txt`
