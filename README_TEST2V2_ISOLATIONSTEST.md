# TOSMC – TEST2v2: Isolierter Terminwechsel-Schutztest

**Stand:** 28.10.2026  
**Nur für:** `OldSmugglersClub/the-old-smugglers-club-test2-v2`  
**Nicht für:** LIVE, Admin, vNext-Simulation.

## Ziel
Nachweis, dass eine künstlich angenommene, vollständig bestätigte Änderung eines Anstoßzeitpunkts der elf feststehenden Spiele auf die fünf technischen Datum-/Uhrzeitfelder genau dieses einen Spiels begrenzt bleibt. **Der künstliche Termin ist keine tatsächliche Ansetzung!**

## Lieferumfang (nur 2 einzuspielende Dateien)
- `.github/workflows/tosmc-test2v2-11-isolationstest.yml`
- `scripts/TEST_tosmc_11_isolierter_terminwechsel.mjs`

Dieses Paket **ersetzt keine** vorhandenen Module. Es nutzt die bereits in TEST2v2 befindliche Datei `scripts/terminwaechter-auto-core.mjs` und die vorhandene Konfiguration `terminwaechter/offizielle-quellen.json`. Keine der elf echten Spielansetzungen, keine Website-Datei, kein Admin und kein Importer ist im ZIP enthalten.

## Einspielen
1. ZIP entpacken und die zwei Dateien an den gleichen relativen Pfaden in das lokale TEST2v2-Repository kopieren.
2. GitHub Desktop: exakt die zwei neuen Dateien kontrollieren, Commit und Push origin.
3. GitHub → Aktionen → `TOSMC TEST2v2 – Isolierter Terminwechsel-Schutztest` → Workflow ausführen (`main`).
4. Den GitHub-Lauf prüfen. Das Artefakt heißt `TOSMC-TEST2V2-11-ISOLATIONSTEST` und enthält `ISOLATIONSTEST.md` sowie `.json`.

## Nachweis
Der Workflow hat `contents: read`, **keinen Zeitplan** und erstellt keine Commits. Das Skript liest `spieldaten.json` und Konfiguration, verändert nur eine **Kopie im Arbeitsspeicher**, prüft gezielte Schutzregeln, die gesamte unveränderte Datenstruktur und die Originaldateiprüfsummen. Das Git-Status-Gate lässt ausschließlich den unversionierten Testbericht zu.

Geprüft werden: feste elf Spiel-IDs; exakter Wechsel eines einzelnen Anstoßzeitpunkts; fünf konsistente Datums-/Uhrzeitfelder; gesamter übriger Datensatz; andere Zielspiele; unveränderte Snapshot-Einträge; Sperre für noch unbekannte Anstoßzeiten, außerhalb 56 Tagen, fremde Wettbewerbe, Quellenfehler, fehlende Uhrzeit, beendete Spiele, Torwerte; unveränderte lokale Quelldateien.

## Bisherige Prüfung
Lokaler synthetischer Test gegen einen älteren verfügbaren 11-Spiele-Testdatenstand: **13/13 Schutzpunkte bestanden**. Ein echter GitHub-Run auf aktuellem TEST2v2 ist noch durchzuführen. Keine reale Terminänderung getestet und keine LIVE-Freigabe.

**Wichtig:** Der bisherige Prüf-/Übernahme-Workflow soll vorerst weiterhin ausschließlich in `VORSCHAU` genutzt werden. `UEBERNEHMEN` nicht starten, bis die Schutzprüfung und eine separate Freigabe vorliegen.
