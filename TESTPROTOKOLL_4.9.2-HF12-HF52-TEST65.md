# TESTPROTOKOLL 4.9.2-HF12-HF52-TEST65

## Technische Prüfungen
- Ausgangsbasis ist die bestätigte Live-Version HF52.
- JavaScript- und JSON-Syntax geprüft.
- Saisonübersicht lädt lokale Zentraldaten sowie DFB-, CL- und EL-Spiele aus OpenLigaDB ohne Browser-Cache.
- Champions League verwendet denselben OpenLigaDB-Spielplan wie die Wettbewerbsseite.
- DFB-Pokal und Europa League filtern auf Achtelfinale, Viertelfinale, Halbfinale und Finale.
- API-Ausfall fällt auf lokale Wettbewerbsdaten zurück und wird im Datenstatus sichtbar gemeldet.
- Kennzahlen verwenden Istwerte; Sonderwertungen erzeugen keine doppelten realen Spiele.
- Status, Terminierungsgrad und Zeitraum werden aus den tatsächlich verfügbaren Spielen abgeleitet.
- Automatische Neuberechnung alle 15 Minuten erfolgt nur bei sichtbarer Seite.
- Cache-Buster stimmen mit `VERSION.txt` überein.
- Geschützte `.github`-Actions bleiben im FULL-Paket enthalten.
- UPDATE- und FULL-Paketinhalt sowie ZIP-Integrität geprüft.

## Nutzerprüfung in Test2v2
- offen

## Live-Freigabe
- nicht erteilt
