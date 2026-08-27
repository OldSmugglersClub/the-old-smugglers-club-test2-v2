# Website 4.9.2-HF12-HF23-TEST11-HF1

Test-Hotfix auf Basis `4.9.2-HF12-HF23-TEST11`.

Ziel ist die korrekte Behandlung des tatsächlichen OpenLigaDB-Datenmodells 2026/27: Die Ligaphase ist dort aktuell eine gemeinsame Gruppe und nicht acht OpenLigaDB-Gruppen.

## Prüfung
1. Paket ausschließlich in Test2-v2 einspielen.
2. Champions-League-Seite neu laden.
3. Das Wettbewerbslagebild muss OpenLigaDB als verbunden anzeigen, sobald Ligaphasen-Paarungen vorhanden sind.
4. Bei Platzhalterterminierung dürfen keine erfundenen Spieltage 1–8 erscheinen.
5. Paarungen müssen als `Terminierung offen` erscheinen.
6. Bundesliga- und Dynamo-Seiten unverändert gegenprüfen.
