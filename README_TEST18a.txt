TOSMC TEST18a – Nur TEST2v2 / read-only
Geändert: .github/workflows/tosmc-test2v2-offizielle-terminquellen-diagnose.yml
Grund: HTML-Quellendiagnose darf bei Exit 2 mit validem UNVOLLSTAENDIG-Bericht
nicht den gesamten GitHub-Workflow rot markieren.
Exit != 2 oder fehlender/ungültiger Bericht bleibt technischer Fehler (rot).
Die TEST18-Gesamtauswertung prüft Browser, HTML und Sonderquellen und muss erfolgreich sein.
Alle anderen Workflows, Skripte, Spielstände und LIVE bleiben unverändert.

Einspielen: ZIP entpacken, .github-Ordner in lokales TEST2v2-Repository
kopieren, geänderte Workflow-Datei in GitHub Desktop prüfen, Commit + Push.
Dann Workflow manuell auslösen. Abschließend Github-Status und 9 Berichtdateien prüfen.
