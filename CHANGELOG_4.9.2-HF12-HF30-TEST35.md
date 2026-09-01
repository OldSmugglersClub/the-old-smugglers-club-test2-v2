# CHANGELOG – Website 4.9.2-HF12-HF30-TEST35

- Basis: abgenommene Test2-v2-Version `4.9.2-HF12-HF30-TEST33`.
- Das verworfene TEST34 ist nicht enthalten.
- Die offizielle Bundesliga-Terminprüfung beginnt künftig beim ersten lokal noch nicht abgeschlossenen Bundesliga-Spieltag statt immer bei Spieltag 1.
- Bereits abgeschlossene Spieltage hängen damit nicht mehr erneut von wechselnden HTML-Antworten der externen Bundesliga-Seite ab.
- Unplausible oder technisch fehlgeschlagene Abrufe der offiziellen Spieltagseite werden bis zu dreimal kontrolliert wiederholt.
- Bleibt die Quelle unbrauchbar, bricht der Import weiterhin fail-safe ohne Datenänderung ab.
- Fehlerprotokolle enthalten HTTP-Status, Inhaltstyp, Antwortlänge und Quelladresse.
- Die zentrale Abrufhärtung gilt ebenfalls für den Dynamo-/2.-Bundesliga-Terminimport.
- Keine Änderung an Cron-Zeiten, Datenformaten, Terminübernahmeregeln, Grid, Layout oder Navigation.
