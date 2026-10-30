# TOSMC Test2v2 – Bundesliga ST8 HF5 Schutz-Merge

Quelle: TEST2v2 main ZIP vom 30.10.2026 23:16; HF5-Adminupload 23:07.

## Schutzregeln
- 20 alte Wertungsblöcke, alle alten abgeschlossenen Aufträge, Rangkontrollen und Änderungsprotokolle 1:1 erhalten.
- Nur neuer Bundesliga-ST8-Teilwertungsblock angehängt.
- `spieldaten.json` war bereits bei Datenversion 83 mit Ergebnis 4:1, daher KEIN neuer Versionssprung; ergänzte Tippverteilung und Bestätigungsmetadaten, `quelleStand=2026-10-30` bleibt erhalten.
- Andere Spiele unverändert.
- `highscore.json` und `website-view.json` erhalten den HF5-Zwischenstand; andere Wettbewerbe/Hall of Fame/Records unverändert.
- Keine GitHub-Änderung ausgeführt.

## Inhalt und technische Überprüfung
- `spielbetrieb.json` SHA256 `38c76760f31f025ac4ea579a8b97539dcb70616a8b9e779bdab7810820151e5f`; fachliche JSON-Diffs gegenüber Test2v2: 10
- `spieldaten.json` SHA256 `38d21d191504558b520ad115f6985b7aedc25fc3015f93d6264ec4a12ac2c79f`; fachliche JSON-Diffs gegenüber Test2v2: 3
- `highscore.json` SHA256 `3a804c785f0d72086a2f835e960f0ffd95423ad0979ab6ca9fbb72d0570864b5`; fachliche JSON-Diffs gegenüber Test2v2: 3186
- `website-view.json` SHA256 `7b15b15fb4cd475caf05e66d2c2da2c0859e45ab8015ac395be1cce05cff2528`; fachliche JSON-Diffs gegenüber Test2v2: 1909

## Freigabegrenze
Das ist ein technisch kontrolliertes, auf Test2v2 basiertes Merge-Paket. LIVE bleibt gesperrt. Die spätere Fortsetzung mit der bereits erzeugten HF5-Arbeitsstandsdatei muss hinsichtlich Test2v2-spezifischer Metadaten separat auf Fortsetzbarkeit kontrolliert werden; Arbeitsstand wurde aus LIVE-Basis erstellt. Vor Einspielung sicherstellen, dass Test2v2 `main` seit dem heruntergeladenen Snapshot nicht geändert wurde.
