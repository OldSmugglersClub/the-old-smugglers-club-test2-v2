# Test2v2 4.9.2-HF12-HF41-TEST42

## Ziel

Fehlende Vereinskennzeichen in der Champions-League-Paarungs- und Tabellenanzeige schließen, ohne die funktionierende OpenLigaDB-Spielplanlogik aus TEST41 anzutasten.

## Geändert

- Champions-League-spezifische Teamauflösung für alle 36 aktuellen Ligaphasen-Teilnehmer ergänzt.
- Bereits vorhandene lokale Originalwappen behalten Vorrang.
- Für Teams ohne lokales Originalwappen wird weiterhin zuerst das sichere OpenLigaDB-Wappen verwendet.
- Falls das externe OpenLigaDB-Wappen fehlt oder nicht geladen werden kann, wird jetzt automatisch das bereits im Projekt vorhandene lokale Schmugglersiegel des richtigen Vereins eingesetzt.
- Die Ersatzgrafik wird in derselben `team-identity__badge`-Position gerendert; Datum, Teamnamen, Status und Coco-Link bleiben unverändert ausgerichtet.
- Aliasvarianten aus OpenLigaDB (u. a. englische/deutsche Vereinsnamen) werden gezielt auf die vorhandenen lokalen Badge-IDs aufgelöst.

## Bestandsschutz

Unverändert bleiben insbesondere:
- TEST41-Spieltagserkennung und OpenLigaDB-Datenquelle `ucl/2026`
- Champions-League-Tabellenberechnung
- Counter und Spieltagskachel der Startseite
- Kicktipp-Logik und Wertungen
- Datenpfade außerhalb der Champions-League-Seite
- GitHub Actions und Automationen
- Navigation, Coco-Logik und Admin-Systeme

## Technische Prüfung

- JavaScript-Syntaxprüfung `wettbewerb.js`: bestanden.
- Alle 36 aktuellen CL-Teamnamen gegen die neue Zuordnung geprüft.
- Für jede Zuordnung existiert ein lokaler Badge-Fallback im Schmugglersiegel-Register.
- Vorhandene lokale Originalwappen werden weiterhin bevorzugt.

## Teststatus

Technische Vorprüfung bestanden; visueller Realtest im Test2v2-Repo durch den Nutzer steht aus.
