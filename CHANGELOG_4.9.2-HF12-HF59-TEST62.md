# TEST62 – Tippverteilung in der CL-Ligaphasenansicht

Basis ist ausschließlich das vom Nutzer nach TEST61 neu hochgeladene Test2-v2-Repository.

- Die separate Champions-League-Ligaphasenansicht verknüpft OpenLigaDB-Partien nun über deren Match-ID mit den zentralen Spielen aus `spieldaten.json`.
- Die Ligaphasenzeilen übernehmen dadurch die dort gespeicherte Kicktipp-Tippverteilung.
- Für verknüpfte Partien wird zugleich die zentrale Spiel-ID verwendet; die bestätigte Coco-Direktwahl bleibt dadurch konsistent.
- Alle Wettbewerbsseiten erhalten wegen der Änderung an der gemeinsamen `wettbewerb.js` dieselbe TEST62-Cache-Kennung.
- Bundesliga-, Dynamo-, Ergebnis-, Tipp-, Highscore- und Spielbetriebsdaten bleiben unverändert.
