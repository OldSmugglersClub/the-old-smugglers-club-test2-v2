TOSMC – TEST19: abgesicherte Korrekturvorschau / TEST2v2
========================================================
Einspielen: ZIP entpacken, Ordner .github und scripts im lokalen
TEST2v2-Repository zusammenführen, GitHub Desktop: 1 Workflow
geändert und 2 neue JavaScript-Dateien kontrollieren, Commit und Push.
Anschließend GitHub Actions: Terminquellen-Diagnose manuell ausführen.

Der Workflow liefert nach Erfolg:
- TEST19_MANIFEST.json (Status, Hash des Ursprungs, sechs Vorschläge)
- TEST19_KORREKTURVORSCHAU.md (lesbare Prüfliste)
- TEST19_NICHT_EINSPIELEN/spieldaten.json (nur Vorschau)

WICHTIG: Die Vorschau NIEMALS direkt aus dem Artefakt in TEST2v2
oder LIVE kopieren. Sie ist nicht freigegeben. Separat folgen aktuelle
Bestandsprüfung, Prüfung der sechs einzelnen Termine und ausdrückliche
Freigabe vor jeglicher Einspielung. Die Version im ZIP ist keine
fertige Website-Korrektur, nur der Generator.

Schutz:
* Kein Schreibzugriff in GitHub, keine Änderung der Root-spieldaten.json.
* Kein Eingriff in LIVE, Admin5 oder vNext.
* Nur zulässige Wettbewerbe und offizielle Quellenhosts.
* Exakter Vergleich bisheriger Daten, gültige Daten/Uhrzeiten,
  Datenversion, Anzahl und bestehende Spielzustände.
* Bei Konflikten/fehlenden Berichten technischer Abbruch (rot).
* Alle übrigen Spiele, Punkte, Ergebnisse und Historien unverändert.
* Zeitplan des bestehenden TEST18a-Workflows bleibt unverändert.
