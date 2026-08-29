# CHANGELOG – 4.9.2-HF12-HF30-TEST25

## Änderung

- Die untere goldene Rahmenlinie der drei rechtlichen Footer-Kacheln wird jetzt im gesamten bereits vorhandenen mobilen Navigationsbereich bis 720 CSS-Pixel dargestellt.
- Damit bleibt der Rahmen auch auf Android-Tablets beziehungsweise Viewports zwischen 621 und 720 CSS-Pixel vollständig geschlossen.
- Die bestehende HF22-Korrektur wurde nur an den bereits vorhandenen 720-Pixel-Breakpoint der mobilen Navigation angeglichen.

## Ursache

Die mobile Navigationsregel erzeugt bis 720 CSS-Pixel einen vollständigen Rahmen für `nav a`.
`legal.css` setzte die untere Rahmenfarbe jedoch außerhalb von Hover auf transparent und stellte sie durch HF22 nur bis 620 CSS-Pixel wieder her.
Dadurch fehlte bei 621–720 CSS-Pixel ausschließlich die untere goldene Linie.

## Unverändert

- Grid
- Kachelgrößen
- Navigation und Navigationslogik
- Grundlayout
- Footer-Struktur und Linkziele
- Website-Daten und Bundesliga-Teilstand 1/9
- Kicktipp-, Coco-, Highscore- und Spieltagslogik
- sämtliche Admin-Dateien

## Teststatus

TEST25 ist ausschließlich für `Test2-v2` bestimmt. Keine Übernahme nach Live ohne Nutzertest und ausdrückliche Abnahme.
