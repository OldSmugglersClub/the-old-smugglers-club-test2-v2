# CHANGELOG 4.9.2-HF10-TEST10

## Champions League
- Fehler in der automatisch berechneten Champions-League-Tabelle behoben: `complete` wird jetzt eindeutig aus dem Ligaphasen-Stand ermittelt.
- Eine Ligaphase gilt erst als vollständig, wenn mindestens 36 Teams vorhanden sind und jedes Team acht Spiele absolviert hat.
- Cache-Buster der Champions-League-Seite aktualisiert, damit die korrigierte `wettbewerb.js` sicher geladen wird.

## Unverändert
- Keine Änderung an Grid, Kachelgrößen, Navigation oder Grundlayout.
- Keine Änderung an Bundesliga-, DFB-, Europa-League- oder sonstiger Wertungslogik.
- Kein automatischer CL-Terminimport in `spieldaten.json` ergänzt.
