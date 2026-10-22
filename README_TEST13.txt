TOSMC OPERATIV – TEST13 – Kursbewegung Gleichstandsdarstellung
Datum 22.10.2026
Basis: TEST12 (fachlich), TEST11 (visuell bestaetigtes Spaltenlayout).

AENDERUNG
Nur die Ausgabe gleichplatzierter Gewinner und Verlierer bei „Kursbewegung“ wurde geaendert:
- Die staerkste Platzveraenderung steht pro Seite einmal als Ueberschrift.
- Bis zu 3 gleichplatzierte Teilnehmer mit Name, erzielten Punkten und Gesamtplatz alt -> neu.
- Ab 4 gleichplatzierten Teilnehmern: „+ n weitere gleichauf“.
- Mehrere gleichplatzierte Teilnehmer werden alphabetisch dargestellt; die Rang- und Punktewerte werden nicht veraendert.
- Die Gesamtzahl der Gleichplatzierten wird vor der visuellen Begrenzung ermittelt; es werden keine Wertungsdaten veraendert.
- Punktgleichstand ohne Auf- oder Abstieg ergibt weiterhin „Keine Platzaenderung“.

AUTOMATISIERTE PRUEFUNGEN
- JavaScript-Syntax: erfolgreich.
- TEST12 Regressionstest: 17 abgeschlossene historische Eintraege, 3 simulierte neue Abschluesse, fehlende Highlights und CL-Einzeltippkontrolle bestanden.
- Kursbewegung: 16 historische Eintraege mit Vorwerten untersucht; 8 enthielten Gleichstaende, 4 davon >3 Gleichplatzierte.
- Extremfall 8 Aufsteiger / 6 Absteiger: je 3 Namen plus +5 bzw. +3 weitere korrekt.
- ZIP-Inhaltspruefung: noch im Paketabschluss.

AUSSCHLIESSLICH TEST2V2
logbuch.js, logbuch.css, logbuch.html aus dem ZIP ersetzen, Commit und Push. Anschliessend im Browser historische Kursbewegung mit Mehrfach-Gleichstaenden und normalen Einzelsiegern auf Desktop/Mobil pruefen.
Keine Aenderung an Live, Admin, JSON, offiziellen Kicktipp-Wertungen, HOF oder Archiven.
Keine Live-Freigabe vor Browserbestaetigung und separatem Produktivvergleich.
