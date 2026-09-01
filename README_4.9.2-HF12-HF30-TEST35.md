# TEST35 – Robuste offizielle Terminprüfung

## Basis

- Test2-v2 `4.9.2-HF12-HF30-TEST33`
- TEST34 wurde verworfen und ist nicht Bestandteil dieser Version.

## Fehlerursache

Der Bundesliga-Terminimport startete bei jedem Lauf erneut auf der offiziellen Seite von Spieltag 1. Nach Abschluss des Spieltags lieferte die externe Seite zeitweise HTML ohne die erwarteten Uhrzeit- oder Abschlussmerkmale. Der Workflow lief dann korrekt an, brach aber in der Fail-safe-Prüfung rot ab.

## Änderung

1. Der Bundesliga-Import ermittelt aus `spieldaten.json` den ersten noch nicht abgeschlossenen Bundesliga-Spieltag.
2. Die offizielle Prüfung beginnt erst bei diesem Spieltag.
3. Unplausible oder fehlgeschlagene Seitenabrufe werden maximal dreimal geprüft.
4. Zwischen produktiven Versuchen liegen 1,5 Sekunden.
5. Bei endgültigem Fehlschlag werden HTTP-Status, Inhaltstyp, Antwortlänge und Quelle protokolliert.
6. Es erfolgt weiterhin keinerlei Datenänderung, solange die offizielle Quelle nicht sicher ausgewertet werden kann.

## Pflichtprüfung

1. Automatisierte Tests vollständig ausführen.
2. Bundesliga-Workflow manuell starten.
3. Im Log prüfen, dass die offizielle Prüfung bei Spieltag 2 oder dem tatsächlich ersten offenen Spieltag beginnt.
4. Prüfen, dass Spieltag 1 nicht erneut abgerufen wird.
5. Bei grüner Quelle prüfen, dass ohne neue Termine kein Commit erzeugt wird.
6. Dynamo-Terminworkflow einmal kontrolliert ausführen und auf unveränderte Fachlogik prüfen.
7. `spieldaten.json` vor und nach einem Lauf ohne neue bestätigte Termine vergleichen.

## Nicht geändert

- Cron-Zeiten
- OpenLigaDB-URL und Zuordnungslogik
- fachliche Regeln für Konkretisierung oder Verlegung
- JSON-Datenformate
- Website-Layout und Navigation
