# Website 4.9.2-HF12-HF23-TEST11

Bereinigter Test2-v2-Stand für den ersten echten Bundesliga-Teilabschluss.

## Grundlage
- Funktionaler und saisonaler Datenstand: Live `4.9.2-HF12-HF23`.
- Einzige darüberliegende funktionale Teständerung: Champions-League-TEST11 einschließlich der TEST10-Tabellenkorrektur.

## Pakete
- `update.zip`: Overlay gegenüber Live `4.9.2-HF12-HF23`.
- `full.zip`: vollständige Neuablage dieses Teststands.
- Beide ZIPs werden durch den Build als GitHub-Actions-Artefakte erzeugt; `full.zip` wird wegen der GitHub-Einzeldateigrenze nicht ins Repository committed.

## Pflichtprüfung
1. Bundesliga-Seite und Startseite laden.
2. Admin-Import vor dem Teilabschluss nur mit echten Kicktipp-Daten durchführen.
3. 1/9-Teilabschluss kontrollieren: Highscore, Ranglistenverlauf, Teamwertung, Tippverteilung und Logbuch.
4. Champions-League-Seite separat auf OpenLigaDB-Daten und JavaScript-Fehler prüfen.
