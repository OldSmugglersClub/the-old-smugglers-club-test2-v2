# TESTPROTOKOLL – 4.9.2-HF12-HF30-TEST35

## Erfolgreich

- Syntaxprüfung `bundesliga-terminimport-auto.mjs`
- Syntaxprüfung `bundesliga-official-schedule.mjs`
- neuer TEST35-Test für:
  - Start ab erstem offenen Spieltag
  - Wiederholung nach unplausibler HTTP-200-Antwort
  - Erfolg nach zweitem verwertbarem Abruf
  - endgültiger Fail-safe-Abbruch nach drei unbrauchbaren Abrufen
  - Diagnose mit HTTP-Status, Inhaltstyp, Antwortlänge und Quelle
- bestehender Bundesliga-Torjäger-Test
- Datenprüfung: 306 Bundesliga-Spiele
- Datenprüfung: Spieltag 1 enthält 9 beendete Spiele
- Datenprüfung: erster offener Bundesliga-Spieltag ist Spieltag 2
- Bytevergleich: `spieldaten.json` gegenüber TEST33 unverändert

## Bekannte historische Testaltlasten

Die folgenden vorhandenen Tests schlagen bereits unverändert auf der Ausgangsversion TEST33 fehl und sind keine TEST35-Regression:

1. `automation-hf15-dynamo-terminautomatik-test.mjs`
   - erwartet den nicht mehr vorhandenen Quelltext `const now=new Date();`
2. `automation-hf14-p1-yaml-test.py`
   - erwartet eine ältere, inzwischen anders aufgebaute `git diff`-Zeile im Workflow

Beide Fehler wurden direkt auf der unveränderten TEST33-Basis reproduziert. Die zugehörige Produktivlogik wurde durch TEST35 nicht geändert.

## Noch durch Nutzer zu prüfen

- manueller Bundesliga-Workflowlauf in Test2-v2
- Logbeginn beim ersten offenen Spieltag 2
- kein Abruf von Spieltag 1
- kein Commit, wenn keine neuen bestätigten Termine vorhanden sind
- kontrollierter Dynamo-Workflowlauf
