# CHANGELOG – Website 4.9.2-HF12-HF23-TEST11-HF1

## Champions League – OpenLigaDB Ligaphase
- OpenLigaDB-Gruppe `Ligaphase` wird als gültige Ligaphase erkannt.
- Vorläufige Paarungen werden angezeigt, ohne den gemeinsamen Platzhaltertermin als echten Spieltag zu interpretieren.
- Acht Spieltage werden erst erzeugt, wenn 144 Partien in genau acht plausiblen Terminclustern mit je 18 Spielen und 36 eindeutigen Teams vorliegen.
- Die Champions-League-Tabelle akzeptiert beendete Spiele der Ligaphase unabhängig von einer vorzeitigen Spieltagsnummer.
- CL-Wappen werden über die lokalen Vereinsstammdaten aufgelöst; OpenLigaDB-Base64- und Fremd-Wappen werden nicht direkt verwendet.

## Unverändert
- Keine Änderung an Grid, Kachelgrößen, Navigation oder Grundlayout.
- Keine Änderung an Bundesliga, Dynamo Dresden, Smugglerauftrag oder Piratenkodex.
- Kein automatischer CL-Import in `spieldaten.json`.
- Live-Repository bleibt unangetastet.
