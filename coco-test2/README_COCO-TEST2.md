# COCO-TEST2

Isoliertes Testmodul für „Coco – Das Orakel“.

## Änderungen gegenüber TEST1
- Coco-Referenzbild wird vollständig ohne Beschnitt angezeigt.
- Matchkarte wurde vollständig aus dem Coco-Bild herausgelöst.
- Desktop-/Mobile-Anordnung neu justiert.
- Wettbewerbsauswahl bleibt dynamisch: sichtbar sind ausschließlich Wettbewerbe mit mindestens einer konkreten, terminierten Partie mit realen Team-IDs.
- Orakel-Engine, Tippverteilung, Sound und „Hmmm …“ unverändert.
- Keine künstliche Flügelanimation in TEST2.

## Datenzugriff
Nur lesend auf `../spieldaten.json` und `../teams.json`.

## Keine Produktivänderung
Website HF10 und Admin 6.5.0-HF2 werden nicht verändert.
