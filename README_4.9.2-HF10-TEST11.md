# TOSMC 4.9.2-HF10-TEST11

Teststand für die Champions-League-Datenquelle.

Zu prüfen:
1. Champions-League-Seite vollständig neu laden.
2. Prüfen, ob die frisch ausgelosten Ligaphasen-Paarungen aus OpenLigaDB erscheinen.
3. Prüfen, ob acht Spieltage korrekt erkannt werden, sobald OpenLigaDB sie vollständig bereitstellt.
4. Prüfen, dass die Seite ohne JavaScript-Fehler lädt.

TEST11 ändert ausschließlich den OpenLigaDB-Shortcut der Champions League und den Cache-Buster der Seite. Die Tabellenlogik aus TEST10 bleibt unverändert.
