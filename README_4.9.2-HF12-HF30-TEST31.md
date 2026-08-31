# TEST31 – Mobile Kurzbezeichnungen der Wertungs-Badges

## Basis

- `4.9.2-HF12-HF30-TEST30`
- TEST30 war vollständig in der frisch synchronisierten Test2-v2-`main.zip` enthalten.

## Änderung

Die vorhandenen vollständigen Badge-Texte bleiben im HTML erhalten. Über responsive Anzeigeelemente werden bis einschließlich 760 px ausschließlich die kurzen Varianten eingeblendet:

- `Tendenz`
- `Exakt`

Oberhalb von 760 px bleiben sichtbar:

- `Tendenz richtig`
- `Sensation exakt`

## Pflichtprüfung

1. Mobil prüfen, dass `Tendenz` vollständig innerhalb des Badges bleibt.
2. Einen exakten Sensationstipp mobil auf die Anzeige `Exakt` prüfen.
3. Desktop prüfen, dass weiterhin `Tendenz richtig` und `Sensation exakt` erscheinen.
4. Prüfen, dass Tippernamen und Tipp-Spalte unverändert bleiben.

## Nicht geändert

- keine Spaltenbreite
- keine JSON- oder Admin-Datei
- keine Wertungslogik
- kein Grid, keine Kachelgröße, keine Navigation und kein Grundlayout

