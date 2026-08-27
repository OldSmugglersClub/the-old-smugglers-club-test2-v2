# TOSMC 4.9.2-HF10-TEST10

Teststand für die Champions-League-Automatik.

Zu prüfen:
1. Champions-League-Seite lädt ohne JavaScript-Fehler.
2. Wenn OpenLigaDB Ligaphasen-Spiele liefert, wird die Tabelle angezeigt/berechnet.
3. Vor Abschluss aller acht Spieltage erscheint der Hinweis auf die bereits verfügbaren Spieltage.
4. Nach acht absolvierten Spielen je Team erscheint der Endstand-Hinweis.

Hinweis: Die Paarungen werden weiterhin nicht automatisch in `spieldaten.json` importiert. Dieser Teststand behebt ausschließlich den gefundenen Tabellenfehler.
