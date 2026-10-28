TOSMC TEST25 – NUR TEST2v2, KEIN LIVE
===================================
Quelle: bestehender TEST2v2-Workflow, erweitert ohne Änderung an Spieldaten, Admin oder Website.

Dateien:
  .github/workflows/tosmc-test2v2-offizielle-terminquellen-diagnose.yml (ersetzen)
  scripts/offizielle-quellen-test25-freigabebruecke.mjs (neu)
  scripts/offizielle-quellen-test25-gate.mjs (neu)
  scripts/TEST_offizielle_quellen_TEST25.mjs (neu)

Installation:
  1. In GitHub Desktop das TEST2v2-Repository wählen; Fetch/Pull.
  2. ZIP im Stammverzeichnis entpacken. README darf dort liegen bleiben oder weg.
  3. Diff kontrollieren: nur 4 Dateien, keine spieldaten.json, kein LIVE.
  4. Commit, Push origin.
  5. Workflow 'Offizielle Terminquellen' manuell OHNE beide Freigabe-Eingaben starten.
  6. GitHub-Artefakt prüfen: TEST25_QUELLENBRUECKE.json und .md sowie frühere Berichte.

Betriebsregeln:
  - Alle konfigurierten offenen Spiele werden überwacht.
  - Fehlende/unvollständige Termininformation -> bisheriger Termin bleibt unangetastet.
  - TEST24/23-Hinweise können offizielle Browserbestätigung niemals ersetzen.
  - Bei Widerspruch blockiert TEST25 die TEST19/20-Korrekturvorbereitung.
  - Änderungen bleiben bis zu ausdrücklicher TEST2v2-Freigabe und anschließender LIVE-Freigabe gesperrt.
  - Keine automatischen Commits, kein Draft-PR, keine LIVE-Änderung.
  - TEST25 ersetzt keine noch fehlende zuverlässige Terminextraktion in Frankreich/Portugal.
