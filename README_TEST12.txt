TOSMC OPERATIV – TEST12 – fachliche Schlussprüfung und Zukunftsabsicherung, 22.10.2026

AUSGANGSBASIS: TEST11 (Layout vom Nutzer bestätigt); Live weiterhin unverändert.

BEHOBENER FACHFEHLER:
Die Flop-5-Teilnahme wird nicht mehr aus dem zusammenfassenden tippStatus einer Spieltagsrangliste abgeleitet. Maßgeblich sind tatsächliche gültige Einzel-Tippabgaben aus tipps.json, zugeordnet anhand der Spiel-IDs der jeweiligen abgeschlossenen Logbucheinträge.
Konkrete Abweichung CL SpT3: LuCipher (4 Punkte) statt Sven_Huhn (5 Punkte).

ZUKUNFTSABSICHERUNG:
Form und Spieltagsbilanz werden auch bei künftigen Ereignistypen ohne Crewduell- oder Kursbewegungs-Highlight angezeigt. Sind die erforderlichen Originaldaten nicht vorhanden, wird keine erfundene Bilanz ausgegeben.
Drei abgeschlossene Spieltage werden dynamisch über das aktuell ausgewählte Event und dessen zwei Vorgänger bestimmt, unabhängig von Wettbewerb. Bei nur 1 oder 2 bereits abgeschlossenen Spieltagen entsprechend kürzeres Fenster.

TECHNISCHE TESTS:
- JavaScript-Syntax geprüft.
- 17 vorhandene abgeschlossene Logbucheinträge gegen verfügbare JSON-Daten verarbeitet.
- Champions League Spieltag 3: 18 Spiele, 68 aktive Tipper, 1.711 Punkte, Ø 25,16.
- Kursbewegung CL SpT3: FloKicker94 +20, Sven_Huhn -37.
- Drei künstliche künftige abgeschlossene Spieltage: rollierendes Dreierfenster geprüft.
- Künstlicher Eventtyp ohne Highlight-Konfiguration: Statistikkacheln bleiben sichtbar.
- CSS gegenüber TEST11 byteidentisch; Layout nicht verändert.

WICHTIG:
Diese automatisierten Tests ersetzen weder den visuellen Browsertest noch einen Original-Kicktipp-Export für künftige Spieltage. Bei jedem zukünftigen Abschluss muss die jeweils neu erzeugte Datenbasis separat nach Master Handover geprüft werden.

EINSPIELUNG NUR TEST2v2:
1. Repository Test2v2 auswählen.
2. logbuch.js und logbuch.html ersetzen; logbuch.css ist byteidentisch und nur vollständig beigefügt.
3. Commit + Push.
4. Browser: CL SpT3 Flop 5, Form, Kursbewegung, Spieltagsbilanz; ältere Einträge, Aufklappen, Desktop/Mobil prüfen.
5. Erst danach erneute Produktivprüfung auf neu heruntergeladener Live-main.zip.

Keine Daten-JSON, Admin-Dateien oder Live-Dateien mit diesem Paket verändern.
