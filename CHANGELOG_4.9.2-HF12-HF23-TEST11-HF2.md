# CHANGELOG – Website 4.9.2-HF12-HF23-TEST11-HF2

## Champions League – HF2

- Provisorische OpenLigaDB-Rohpaarungen werden nicht mehr als lange Besucher-Spielübersicht gerendert, solange die acht Spieltage nicht eindeutig plausibilisiert sind.
- Die automatische Erkennung bleibt aktiv: Erst bei 144 Ligaphasen-Partien, acht Terminclustern, jeweils 18 Spielen und 36 eindeutigen Teams wird automatisch auf die reguläre 8-Spieltage-Ansicht gewechselt.
- Die Nullstand-/Live-Tabelle bleibt verfügbar und wird weiterhin ausschließlich aus der OpenLigaDB-Ligaphase berechnet.
- Wappenauflösung optimiert: lokale Vereinsstammdaten und API-Aliase werden gecacht; lokale Originalwappen haben Vorrang. Fehlt ein lokales Team, darf nur eine sichere HTTP(S)-Wappen-URL von OpenLigaDB als Fallback geladen werden. `data:`/Base64-Wappen bleiben ausgeschlossen.
- Performance: die teure lange Rohpaarungsliste entfällt; Teamauflösung erfolgt über einen Index statt wiederholter Vollsuche.
- Keine Änderung an Bundesliga, Dynamo Dresden, Smuggleraufträgen, Piratenkodex, Grid, Navigation, Kachelgrößen oder Grundlayout.
- Live-Repository unverändert.
