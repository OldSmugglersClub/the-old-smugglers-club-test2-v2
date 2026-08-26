# CHANGELOG – FORM DER CREW WEBSITE-ONLY TEST1

- Keine Admin-Änderung.
- Keine neue Datendatei.
- Nutzt ausschließlich die bereits vorhandene `spieltagpunkte.json`.
- Für den jeweils angezeigten abgeschlossenen Logbuch-Eintrag wird der dort gespeicherte
  `gesamtspieltagssiege`-Wert mit dem unmittelbar vorherigen abgeschlossenen Wertungsblock verglichen.
- Formwert = Delta des vorhandenen Kicktipp-S-Werts.
- Top 5 nach größtem Delta.
- Bei gleichem Delta bleibt die bereits vorhandene Kicktipp-Reihenfolge des aktuellen Wertungsblocks maßgeblich.
- Teilnehmer ohne vorherigen Vergleichswert werden nicht künstlich bewertet.
- Kachel wird erst ab dem zweiten abgeschlossenen Wertungsblock angezeigt.
