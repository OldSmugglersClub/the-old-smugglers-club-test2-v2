TOSMC Test2v2 – UPDATE TEST15 -> TEST16

Ziel:
1. Fehlende Europa-League-Wappen in Tabelle/Formtabelle korrekt auflösen.
2. Spieltagsübersicht der Europa-League-Ligaphase aus OpenLigaDB anzeigen.

Änderungen:
- zusätzliche EL-spezifische OpenLigaDB-Namensaliase, u. a.:
  Besiktas Istanbul, Ferencvaros Budapest, Olympiakos Piräus,
  SC União Torreense, Omonia Nikosia, Hapoel Beer Scheva,
  Stade Rennes, Viktoria Pilsen
- neue Informationsübersicht "Spiele der Europa League · Ligaphase"
  mit Spieltagen und den Paarungen aus OpenLigaDB
- Ligaphase bleibt rein informativ; TOSMC-Wertung weiterhin erst ab Achtelfinale
- keine Änderung an teams.json
- keine neuen oder ersetzten Wappen-Dateien
- keine Wertungs-, HOF-, Ergebnis- oder sonstigen Spieldaten geändert
- gemeinsamer wettbewerb.js Cache-Key auf TEST16 in allen 8 Wettbewerbsseiten angehoben

Zielversion:
4.9.2-HF12-HF101-TEST16
