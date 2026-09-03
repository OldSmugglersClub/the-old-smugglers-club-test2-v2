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

---

# Live-Website 4.9.2-HF12-HF41

## Geändert

- Die in Test2-v2 TEST40 abgenommene visuelle Coco-Überarbeitung wurde kontrolliert auf den aktuellen Live-Stand HF40 übertragen.
- Coco-Bereich auf Desktop harmonischer proportioniert.
- Coco-Bild erhält mehr Präsenz, ohne die Informationsspalte zu verdrängen.
- Coco's Bilanz und Orakel-Kodex wurden visuell vereinheitlicht.
- Statistikfelder sind gleichmäßig angeordnet und besser lesbar.
- Der Button `Coco befragen` wurde visuell stärker gewichtet.
- Auswahlfelder und Panels erhalten eine dezente Premium-Politur über CSS.

## Bestandsschutz

- Keine Änderung an Coco-Logik oder Bilanzberechnung.
- Keine Änderung an `coco.js` oder `coco-engine.js`.
- Keine Änderung an JSON-Daten, Datenpfaden oder Automationen.
- Keine Änderung an Kicktipp-Verknüpfung, Navigation, Startseiten-Kacheln, Counter oder Spieltagskachel.
- Alle übrigen Funktionen und Dateien der Live-Baseline HF40 bleiben erhalten.

---

# CHANGELOG
- HF40: Abgenommene zeitgesteuerte Website-Mitteilung auf der Startseite ergänzt.
- Mallorca-Mitteilung vom 25.09.2026 00:00 Uhr bis 28.09.2026 06:00 Uhr vorkonfiguriert.
- Fehlende oder ungültige Konfiguration blockiert die Website nicht.
- Bestätigung gilt pro Browser-Sitzung und Mitteilungs-ID.
- Vorschau unabhängig vom Zeitraum über `?hinweis-vorschau=1` möglich.
- Drei Live-Auto-Workflows ohne Funktionsänderung neu gespeichert.
- Ausschließlich Kommentar zur Scheduler-Neuregistrierung ergänzt.
- Cron-Zeiten, Jobs, Berechtigungen und Fachlogik unverändert.
