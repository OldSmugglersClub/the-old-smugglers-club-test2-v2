TOSMC Spieltags-Logbuch – TEST11 (22.10.2026)

Ausgangsbasis: TEST10; logbuch.js ist byteidentisch.

Korrektur: Die linke Kachelgruppe (Crewduell, Kursbewegung, Spieltagsbilanz) bleibt nun auch bei aufklapptem Bereich "Gewertete Spieltage" rechts in gleicher Gesamthoehe. Die Spieltagsbilanz dehnt sich flexibel, und ihr 2x2-Kennzahlenraster nutzt die zusaetzliche Hoehe. Keine Leerzeilen, keine veraenderten Texte oder Rechenwerte. Die mobile einspaltige Anordnung ist explizit ausgeschlossen von den neuen CSS-Regeln.

Nur Test2v2: logbuch.css und logbuch.html ersetzen. logbuch.js ist zur eindeutigen Gesamtbasis enthalten, muss bei unveraendertem TEST10 nicht erneut kopiert werden. Nach Commit/Push: Desktop mit "Gewertete Spieltage" geschlossen/geoeffnet sowie Mobil pruefen. Live bleibt unberuehrt.

Pruefgrenze: Statische CSS-/ZIP-Kontrolle ist kein Ersatz fuer den Test auf der echten Seite.
