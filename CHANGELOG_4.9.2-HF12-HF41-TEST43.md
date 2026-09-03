# Test2v2 4.9.2-HF12-HF41-TEST43

## Ziel

Die in TEST42 weiterhin teilweise leer gebliebenen Wappenpositionen der Champions-League-Ansetzungen zuverlässig schließen.

## Ursache

Die OpenLigaDB-Bildquelle wurde bei Teams ohne lokales Originalwappen direkt in die Badge-Fläche eingesetzt. Wenn die Fremdquelle im Browser blockiert, sehr langsam oder technisch unbrauchbar antwortet, blieb die 34x34-Pixel-Badge sichtbar, aber optisch leer. Zusätzlich verwendete `champions-league.html` noch einen alten Cache-Buster (`wettbewerb.js?v=4.9.2-HF12-HF24`), sodass ein Browser nach TEST41 weiterhin eine ältere JS-Fassung aus dem Cache verwenden konnte.

## Geändert

- Lokaler Team-Badge wird bei CL-Teams jetzt sofort gerendert.
- Ein OpenLigaDB-Wappen ersetzt diesen lokalen Fallback nur noch nach erfolgreichem Vorladen als tatsächlich lesbares Bild.
- Fehler, Blockierung oder Hängen der externen Bildquelle können dadurch keine leeren Wappenpositionen mehr erzeugen.
- Der Cache-Buster der Champions-League-Seite wurde auf `4.9.2-HF12-HF41-TEST43` gesetzt, damit die aktuelle `wettbewerb.js` sicher geladen wird.
- Vorhandene lokale Originalwappen behalten unverändert Vorrang.

## Bestandsschutz

Unverändert bleiben insbesondere:
- TEST41-Spieltagserkennung und OpenLigaDB-Datenquelle `ucl/2026`
- Champions-League-Tabellenberechnung
- Counter und Spieltagskachel der Startseite
- Kicktipp-Logik und Wertungen
- GitHub Actions und Automationen
- Navigation, Coco-Logik und Admin-Systeme

## Technische Prüfung

- `node --check wettbewerb.js`: bestanden.
- Nur Champions-League-Wappenfallback und CL-JS-Cache-Buster funktional betroffen.
- Keine CSS-/Layoutänderung.

## Teststatus

Technische Vorprüfung bestanden; visueller Realtest im Test2v2-Repo durch den Nutzer steht aus.
