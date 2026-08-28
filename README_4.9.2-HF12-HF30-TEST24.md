# 4.9.2-HF12-HF30-TEST24

Testversion auf Grundlage der aktuellen Live-Version `4.9.2-HF12-HF30`.

## Ziel

Die Spieltags-Kachel muss beim Beginn des bisher fokussierten Events automatisch und ohne F5 auf das nächste Event wechseln.

## Technische Umsetzung

Der bereits sekündlich laufende Event-Countdown erkennt einen Wechsel des nächsten Events. Nur bei einem tatsächlichen Wechsel stößt er die Neuberechnung der Spieltags-Kachel an. Es findet kein sekündliches Nachladen der Projektdaten statt.

Zusätzlich wird der Zustand beim Wiederöffnen eines pausierten Browser-Tabs kontrolliert.

## Installation in Test2-v2

1. UPDATE-Paket in `OldSmugglersClub/the-old-smugglers-club-test2-v2`, Branch `main`, übernehmen.
2. `index.html` und `VERSION.txt` ersetzen.
3. Die drei neuen TEST24-Dokumente hinzufügen.
4. Keine Dateien löschen.
5. Testseite hart neu laden.

## Pflichtprüfungen

- Desktop: Seite vor einem Anpfiff öffnen und bis über den Anpfiff hinaus unverändert geöffnet lassen.
- Mobil: denselben Wechsel ohne F5 prüfen.
- Kontrollieren, dass Überschrift, nächstes Spiel, Eventanzahl und Eventliste gemeinsam wechseln.
- Seite vor dem Anpfiff in den Hintergrund legen und nach dem Anpfiff wieder öffnen.
- Mehrere aufeinanderfolgende Eventgrenzen prüfen.
- Counter und darunterliegende Spielanzeige auf unveränderte Funktion prüfen.

`LiveAdmin` und sämtliche Admin-Dateien werden nicht verändert. Noch keine Live-Freigabe.
