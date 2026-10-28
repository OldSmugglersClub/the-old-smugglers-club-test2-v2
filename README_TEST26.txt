TOSMC TEST26 – ISOLIERTE SIMULATION, NUR TEST2v2
==============================================
Stand: 28.10.2026

AUSTAUSCHDATEIEN (3):
1. .github/workflows/tosmc-test2v2-offizielle-terminquellen-diagnose.yml (bestehende Datei aktualisieren)
2. scripts/offizielle-quellen-test19-vorschau.mjs (bestehende Datei aktualisieren; offizielle FR/PT-Domains ergaenzen)
3. scripts/TEST_offizielle_quellen_TEST26.mjs (neu)

VERBINDLICHE EINSPiELUNG:
- Ausschliesslich im lokalen TEST2v2-Repository, NIE im LIVE-Repository.
- Zuerst GitHub Desktop Fetch/Pull.
- ZIP in einen separaten Ordner entpacken, darin .github und scripts ins TEST2v2-Repo kopieren.
- Im GitHub Desktop Diff exakt diese drei Dateien pruefen. spieldaten.json darf NICHT geaendert sein.
- Commit und Push origin.
- Bestehenden Workflow "Offizielle Terminquellen" manuell mit LEEREN Freigabefeldern starten.
- Danach "TEST26 gestartet" melden, damit die Workflow-Berichte geprueft werden.

SICHERHEIT:
- 2 rein synthetische Szenarien: PSG-Marseille und Benfica-Sporting.
- 44 lokale Assertions bestanden.
- Keine echten Terminverschiebungen, keine Aenderung an spieldaten.json.
- Kein Git-Commit, kein GitHub-PR, keine LIVE-Freigabe durch das Testskript.
- Freigaben nur TEST2v2, nur bei manuellem Workflow-Start und mit gueltigem Quellhash.
- TEST25-Gate unveraendert Pflicht. Zusaetzliche offizielle Domains erlauben NICHT allein eine Freigabe.
- TEST26 schreibt ausschliesslich Berichte in terminwaechter-bericht/.

NEUE BERICHTE:
- TEST26_SIMULATION.json
- TEST26_SIMULATION.md

HINWEIS: Dies ist ein simulierter E2E-Integrationsnachweis, kein erfolgreicher praktischer FR/PT-Live-Quellenbeleg.
