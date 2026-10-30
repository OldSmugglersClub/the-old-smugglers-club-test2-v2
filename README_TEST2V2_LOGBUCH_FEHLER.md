# TOSMC – Besucherfehler Logbuch (30.10.2026)

## Ziel
Nur `OldSmugglersClub/the-old-smugglers-club-test2-v2`, **nicht** LIVE, Admin oder vNext.

1. Startseite, Wochenend-Kachel: doppelte Anzeige `Piratenkodex Piratenkodex I – El Clásico` auf `Piratenkodex I – El Clásico` reduzieren. Dadurch sollte der bisherige Desktop-Zeilenumbruch wegfallen, ohne feste Breiten zu erzwingen. Andere Wettbewerbstitel bleiben unangetastet.
2. Logbuch-Highlight „Wer hat’s gerochen?“: statt Rohwerten `barcelona – real-madrid` den bestehenden `teamDisplayName()`-Mechanismus nutzen. Derselbe Mechanismus wird bereits auf der Startseite verwendet; wirkt für alle Wettbewerbe mit diesem Highlight-Typ. Auch die Kurzbeschreibung wird angeglichen.

## Installation mit GitHub Desktop

Das Paket ist ein **gezielter Anwender-Patch**, kein vollständiger Austausch der großen Datei `logbuch.js`. Dadurch bleiben alle anderen zwischenzeitlich erfolgten Änderungen im lokalen Repository erhalten.

1. ZIP **direkt in das Stammverzeichnis** des lokalen `the-old-smugglers-club-test2-v2`-Repositories entpacken (dort liegen `logbuch.js`, `logbuch.css` und `logbuch.html`).
2. `TEST2V2_LOGBUCH_FIX_STARTEN.cmd` per Doppelklick starten. Der Patch prüft **vor dem Schreiben** alle drei Originalstellen auf eindeutige Übereinstimmung. Bei Abweichung stoppt er.
3. Die beiden Installationsdateien (`.cmd` und `.ps1`) aus dem Repository-Verzeichnis entfernen; **nicht committen**.
4. GitHub Desktop: kontrollieren, dass **ausschließlich `logbuch.js`** geändert ist, Commit und Push in **TEST2v2**.
5. Auf TEST2v2 bei Desktop-Breite und Mobilansicht beide Stellen testen. Erst nach ausdrücklicher Freigabe separates LIVE-Paket.

## Grenzen

- Keine Änderung der Spieldaten, Tipps, Ergebnisse, Wertungen, Logbuch-Daten oder URLs.
- Es wird ausschließlich die Darstellung in `logbuch.js` korrigiert.
- Die Einzeiligkeit ist für den dargestellten Fall durch Wegfall der Dopplung plausibel, aber ohne Browserprüfung auf TEST2v2 noch nicht bewiesen.
- Keine automatische Übernahme nach LIVE.
