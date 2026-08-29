# CHANGELOG – 4.9.2-HF12-HF30-TEST26

## Grundlage
Bestätigter Test2-v2-Stand `4.9.2-HF12-HF30-TEST25` inklusive Bundesliga-Teilstand 1/9.

## Neu
- Dynamische Bundesliga-Torjägerdaten aus dem offiziellen OpenLigaDB-Endpunkt `getgoalgetters/bl1/2026`.
- Neue lokale Datei `bundesliga-torjaeger.json`.
- Die beiden bisherigen statischen Kacheln `Wertung` und `Saisonstart` werden durch `Torjäger` und `Torjägerfeld` ersetzt.
- Bei Gleichstand wird keine künstliche Rangfolge behauptet.
- Die dritte Kachel `Datenzentrale` bleibt unverändert.
- Bestehender Ergebnisworkflow aktualisiert zusätzlich die lokale Torjägerdatei.

## Schutz
- Kein direkter OpenLigaDB-Aufruf aus dem Browser.
- Bei fehlender/ungültiger Torjägerdatei bleiben neutrale Fallbacktexte sichtbar.
- Bei bereits vorhandenem Bundesliga-Ergebnis, aber leerer OpenLigaDB-Torjägerantwort, wird die bestehende lokale Datei nicht überschrieben.
- Nur geänderte Sportdaten erhöhen `datenVersion`; unveränderte Antworten erzeugen keinen Commit.

## Unverändert
- Grid
- Kachelgrößen
- Navigation
- Grundlayout
- Tabellen-, Ergebnis- und Wertungslogik
- Bundesliga-Teilstand 1/9
- Kicktipp, Coco, Highscore
- TestAdmin und LiveAdmin
- Cron-Zeit, Permissions und Concurrency des Ergebnisworkflows
