TOSMC TEST24 – Nur TEST2v2, keine LIVE-Einspielung

Inhalt dieses ZIPs:
.github/workflows/tosmc-test2v2-offizielle-terminquellen-diagnose.yml (bestehenden Workflow aktualisieren)
scripts/offizielle-quellen-test24-pruefung.mjs (NEU)
scripts/TEST_offizielle_quellen_TEST24.mjs (NEU)

Anwendung:
1) TEST2v2-Repo in GitHub Desktop aktualisieren (Fetch/Pull).
2) Archiv in TEST2v2-Repo-Stammverzeichnis entpacken, die beiden Skripte und die Workflow-Datei übernehmen.
3) Prüfen: Nur 3 Dateien aus diesem Paket geändert, keine spieldaten.json.
4) Commit/Push origin.
5) In GitHub Actions den bisherigen Terminquellen-Diagnose-Workflow manuell starten;
   BEIDE Freigabeeingaben LEER LASSEN.
6) Ergebnisartefakt kontrollieren: TEST24_QUELLENABGLEICH.json und .md.

Sicherheitsregeln:
- Dies ist eine rein lesende Zusatzdiagnose.
- Francia: Saisonkalender und Ankündigungen sind nur Hinweise, keine aktuelle Freigabe.
- Portugal: Prüfung über offiziell angezeigten Spielkopf.
- Unvollständige oder widersprüchliche Angaben ändern den Website-Bestand NICHT.
- Keine automatische Freigabe, keine Git-Pushes, kein PR, keine LIVE-Auswirkung.
- Vollständiger französischer Live-Spielplanabgleich weiterhin gesondert zu lösen.
