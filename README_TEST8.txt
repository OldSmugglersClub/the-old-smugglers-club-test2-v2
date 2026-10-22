TOSMC – TEST8 – Spieltagsbilanz aktive Tipper (22.10.2026)

Basis: TEST7. Geändert ist ausschließlich die Zählung der tatsächlich aktiven Tipper in der Spieltagsbilanz. Die Tippabgaben werden aus tipps.json für die zum abgeschlossenen Logbucheintrag gehörenden Spiel-IDs ermittelt. Nur Datensätze mit status=abgegeben und gültigen Ergebnistipps zählen. Mehrere Tipps derselben Person zählen als ein aktiver Tipper.

Punkte bleiben die offizielle Spieltagspunktsumme aus spieltagpunkte.json. Durchschnitt = Spieltagspunkte geteilt durch die Anzahl eindeutiger aktiver Tipper.

CL Spieltag 3: 18 Spiele; 1.181 abgegebene Einzeltipps von 68 unterschiedlichen Tippern; 1.711 Punkte; 25,16 Ø-Punkte je aktivem Tipper. 32 Personen ohne Tippabgabe. Gegen Original-Kicktipp-CSV abgeglichen.

Falls keine abgegebenen Tipps im Datenbestand gefunden werden, erscheint die Bilanz nicht. Keine erfundene Division durch 100.

Einspielung NUR Test2v2: logbuch.js und logbuch.html austauschen (logbuch.css unverändert). Commit/Push, dann Desktop/Mobil und ältere Spieltage prüfen. Keine Live-Freigabe.
