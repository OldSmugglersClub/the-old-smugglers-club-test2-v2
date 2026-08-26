# CHANGELOG – ORIGINAL WAPPEN TEST3

## Korrektur der Bezugsgröße
Die vorherige 145er-Masterliste wird nicht mehr als aktuelle Einspielprüfung verwendet.
Maßgeblich sind die tatsächlich in `spieldaten.json` verwendeten Team-IDs.

## Ergebnis
- tatsächlich verwendete Teams: 52
- lokal vorhandene Originalwappen: 52 / 52
- fehlende Originalwappen im aktuellen Tippspielbestand: 0

## Technik
- Dynamo Dresden: bereits bestätigtes lokales SVG aus TEST1.
- übrige 51 Teams: lokale 512x512-PNGs aus den neun vom Nutzer gelieferten Saisonpaketen.
- zentrale Zuordnung über `assets/team-logos/original-team-logos.json`
- Schmugglersiegel bleiben vollständig als Fallback bestehen.
- Keine Änderung an Admin, `teams.json`, CSS, Wappencontainern, Grid, Positionierung oder Navigation.

## Zukunft
Die neun Pakete enthalten insgesamt 167 eindeutige 512x512-Vereinswappen und bilden den Quellpool für später tatsächlich hinzukommende CL-/EL-Teilnehmer.
