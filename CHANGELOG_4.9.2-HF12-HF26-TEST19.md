# CHANGELOG – 4.9.2-HF12-HF26-TEST19

## Basis
- Ausgangsstand: Live 4.9.2-HF12-HF26.
- Keine Übernahme aus TEST17/TEST18.

## Neu
- Hauptnavigation um den letzten Menüpunkt **Landgang** ergänzt.
  - Desktop: letzter Punkt in der bestehenden Menüleiste unter dem Banner.
  - Mobil: letzter Punkt im bestehenden mobilen Menü.
- Neues, eigenständiges Outro-Modul (`outro.css`, `outro.js`).
- Outro startet ausschließlich nach bewusster Benutzeraktion auf „Landgang“.
- Szene beginnt mit bereits geöffneter Schatztruhe und sichtbarem Gold/Piratenschmuck.
- Deckel schließt, Truhe erhält einen kurzen physischen Impuls und einen synchronisierten Holz-/Metall-Schlag über Web Audio.
- Nach Ablauf wird `window.close()` versucht.
- Falls der Browser das Schließen verhindert, erscheint eine schwarze Abschlussansicht mit dem Hinweis, dass der Tab geschlossen werden kann.

## Unverändert
- Banner.
- Grid, Kachelgrößen und Seitenaufbau.
- Bestehende Navigationstechnik; nur ein weiterer Eintrag wurde ergänzt.
- Intro.
- Wettbewerbe, Highscore, Logbuch, Coco und alle Datenmodule.

## Medien
- Keine neue Bilddatei erzeugt oder eingebaut.
- Kein externes Audio und keine lizenzpflichtigen Fremdassets.
