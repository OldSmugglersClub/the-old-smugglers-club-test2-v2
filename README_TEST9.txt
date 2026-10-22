TOSMC TEST9 – Reparatur Spieltagsbilanz (22.10.2026)

Fehlerursache TEST8: Das ZIP enthielt nicht die logbuch.css mit den neuen CSS-Klassen für die 2x2-Spieltagsbilanz. Deshalb wurden die vier Kennzahlen im Browser unformatiert dargestellt.

TEST9: Alle drei zusammengehörigen Website-Dateien vollständig enthalten.
- logbuch.js: Fachlogik identisch mit TEST8, aktive Tipper durch mindestens eine tatsächliche Tippabgabe aus tipps.json.
- logbuch.css: CSS aus TEST7 mit der geprüften 2x2-Bilanzdarstellung und allen bisherigen Layoutstilen.
- logbuch.html: Cache-Kennung beider Ressourcen auf TEST9 angepasst.

Ausschließlich Test2v2: ALLE DREI Dateien ins Test-Repository (Repository-Root) kopieren, ersetzen, Commit und Push. Keine Daten-JSON ändern. Nach erfolgreichem Deployment Browser (ggf. Hard-Refresh) auf Desktop und Mobil prüfen.

Erwartung CL Spieltag 3: 18 Spiele, 68 aktive Tipper, 1711 Punkte, 25,16 Ø Punkte je aktivem Tipper.
Live nicht ändern; keine Produktivfreigabe vor bestätigtem Browsertest.
