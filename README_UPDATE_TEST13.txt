TOSMC Test2v2 TEST13

Korrektur der Schutzarchitektur nach TEST12.

Ursache:
wettbewerb.js ist eine gemeinsame Datei für acht Wettbewerbsseiten. In TEST12
wurde nur europa-league.html auf eine neue Cache-Kennung gesetzt. Der
Release-Guard blockiert zu Recht unterschiedliche Cache-Kennungen für dieselbe
gemeinsame JavaScript-Datei.

Korrektur:
Alle acht Seiten verwenden jetzt dieselbe Cache-Kennung:
4.9.2-HF12-HF101-TEST13

Betroffene HTML-Dateien:
- bundesliga.html
- champions-league.html
- dfb-pokal.html
- dynamo-dresden.html
- europa-league.html
- piratenkodex.html
- relegation.html
- weihnachtsregatta.html

Zusätzlich:
- VERSION.txt -> TEST13

Unverändert:
- wettbewerb.js selbst (der Europa-League-OpenLigaDB-Fix aus TEST12 bleibt exakt erhalten)
- alle JSON-Datendateien
- Wertungen
- Hall of Fame
- Historie
- Admin-Dateien
