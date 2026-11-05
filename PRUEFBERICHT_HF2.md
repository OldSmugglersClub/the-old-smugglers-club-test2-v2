# TEST2v2-STARTLOGBUCH-WEEKDAY-HF2 – 05.11.2026

Ausgang: TEST2v2-STARTLOGBUCH-WEEKDAY-HF1, aus zuvor bereitgestelltem Austauschpaket.

## Änderung
Nur `logbuch.js`:
- Startseitenüberschrift bei vorhandenem Rückblick: „Die Geschichten des Spieltags“ statt „Die Geschichten des Wochenendes“.
- Bei genau einer Ereigniskarte: zentrierte, bis 720px breite Einspalten-Darstellung; bei mehreren Karten unveränderte Grid-Anordnung.
- Keine Änderungen an Ereignisauswahl, Daten, Admin oder vollständiger Logbuchseite.

## Prüfungen
- JavaScript-Syntax: bestanden (`node --check`).
- Statische Prüfung: neue Überschrift, Einzelkartenregel, unveränderte Wochenendgruppierung: bestanden.
- Browser-/TEST2v2-Sichtprüfung: ausstehend.
- LIVE-Freigabe: nicht erteilt.

## Einspielschutz
Nur im lokalen TEST2v2-Repository die Datei `logbuch.js` ersetzen. Bei bestehenden lokalen Änderungen an dieser Datei STOP; nicht blind überschreiben. Keine weiteren Dateien in das Repository kopieren.
