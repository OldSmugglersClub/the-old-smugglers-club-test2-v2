# CHANGELOG – 4.9.2-HF12-HF23-TEST17

## Testziel
Interaktives, filmisches Schiffbruch-Intro als Ersatz für das bisherige automatische Logo-Intro.

## Änderungen
- Bestehendes Intro innerhalb von `index.html` ersetzt.
- Keine Änderung an Grid, Kachelgrößen, Navigation oder Grundlayout.
- Startszene: halb zerstörtes Rettungsboot in Sturm-/Inselkulisse.
- Keine sichtbare Standard-Schaltfläche: Klick/Tap auf die Intro-Szene startet den Ablauf.
- Nutzerinteraktion aktiviert Web-Audio zuverlässig nach Browser-Autoplay-Regeln.
- Audio-Sequenz: Holz/Schiff, tiefer Whoosh, Cinematic Impact/Subbass, kurzer Coco-Ruf.
- Nach dem Tap Kamerafahrt Richtung Insel, Coco erscheint als kurzer visueller Akzent, danach Übergang auf die Website.
- Bestehendes Coco-Asset `assets/logbuch/coco-logbuch.png` wird wiederverwendet.
- Neues Intro-Bild ist ein Ausschnitt aus dem bereits freigegebenen/erzeugten Konzeptmaterial; es wurde kein neues Motiv generiert.
- Responsive Verhalten für Desktop und Mobil ergänzt.
- `prefers-reduced-motion` berücksichtigt.

## Nicht geändert
- Website-Hauptlayout
- Navigation
- Banner
- Kacheln
- Wettbewerbslogik
- Datenquellen
- Logbuchlogik
