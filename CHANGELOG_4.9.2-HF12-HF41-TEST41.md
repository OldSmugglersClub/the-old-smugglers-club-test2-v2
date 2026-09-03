# Test2v2 4.9.2-HF12-HF41-TEST41

## Ziel

Champions-League-Kachel wieder in den vorgesehenen automatischen Betrieb bringen, ohne auf die vollständige Ligaphase mit 144 Partien zu warten.

## Geändert

- Champions-League-Datenquelle auf den strukturierten OpenLigaDB-Datensatz `ucl/2026` umgestellt.
- Die bisherige 144-Spiele-/8-Spieltage-Gesamtfreigabe entfernt.
- Jeder Spieltag wird jetzt einzeln freigeschaltet, sobald OpenLigaDB dafür 18 vollständig terminierte Spiele mit 36 eindeutigen Teams liefert.
- Explizite OpenLigaDB-Spieltagsnummern 1–8 haben Vorrang.
- Für Datensätze ohne explizite Spieltagsnummer bleibt ein konservativer Termincluster-Fallback erhalten.
- Die Statuskachel zeigt nun den aktuell erkannten Teilstand (`x von 8 Spieltagen erkannt`).
- Weitere vollständig terminierte Spieltage erscheinen automatisch beim Neuladen, ohne erneuten Website-Fix.
- Die Champions-League-Tabelle bleibt aus OpenLigaDB-Spieldaten berechnet und kann bereits erscheinen, sobald alle 36 Teilnehmer im gelieferten Ligaphasen-Datensatz vorhanden sind.

## Bestandsschutz

Unverändert bleiben insbesondere:
- Counter und Spieltagskachel der Startseite
- Kicktipp-Logik und Wertungen
- Datenpfade außerhalb der Champions-League-Seite
- GitHub Actions und sonstige Automationen
- Navigation
- Coco-Logik
- Admin-Systeme

## Teststatus

Technische Vorprüfung bestanden; Realtest im Test2v2-Repo durch den Nutzer steht aus.
