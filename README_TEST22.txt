TOSMC TEST22 – Lückenlose Überwachung bei unvollständigen offiziellen Terminen
Repository: ausschliesslich the-old-smugglers-club-test2-v2

Dateien im Paket:
.github/workflows/tosmc-test2v2-offizielle-terminquellen-diagnose.yml
scripts/offizielle-quellen-test22-ueberwachung.mjs
scripts/TEST_offizielle_quellen_TEST22.mjs

TEST22 erzeugt im bestehenden READ-only GitHub-Diagnoselauf zwei Zusatzberichte:
TEST22_UEBERWACHUNG.json und TEST22_UEBERWACHUNG.md

Jede konfigurierte offene Partie muss einen Browser-Befund erhalten. Das gilt
auch fuer PSG–Marseille und Benfica–Sporting bei unvollstaendiger Ansetzung.
Die bisherige Website-Uhrzeit und das Datum bleiben IMMER unveraendert.
Nur vollstaendige offizielle Browser-Termine duerfen als potenzielle Korrektur
in der Diagnose erscheinen. Zusatzquellen mit Teilinformationen liefern nur
Hinweise und keine Freigabe. Kein Git-Schreibrecht; kein LIVE-Zugriff.

Einspielen:
1. ZIP entpacken.
2. Ordner .github und scripts in das lokale TEST2v2-Repository kopieren.
3. GitHub Desktop: genau 1 geaenderte Workflow-Datei und 2 neue Skripte pruefen.
4. Commit und Push origin in TEST2v2.
5. Bisherigen Terminquellen-Workflow manuell ohne Freigabefelder starten.
6. Berichte auf 11 ueberwachte Spiele, 9 verifiziert und 2 offen pruefen;
   Zahlen koennen sich bei neuen amtlichen Erkenntnissen aendern.

Kein Einspielen von Spieldaten. Kein automatischer Commit, PR, Merge oder LIVE.
Die noch ausstehende echte automatische geplante GitHub-Ausloesung wird
separat verifiziert. TEST22 ist keine Loesung fuer fehlende Feed-Anbindung.
