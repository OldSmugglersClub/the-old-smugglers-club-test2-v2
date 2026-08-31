# TEST30 – Besucherfehler im Spieltags-Logbuch

## Ziel

Diese Testversion korrigiert drei vom Nutzer am Bundesliga-Abschluss 9/9 festgestellte Darstellungsprobleme im bestehenden Spieltags-Logbuch.

## Technischer Umfang

- `logbuch.js`
  - rendert bei „Kursbewegung“ `gewinner` und `verlierer`
  - zeigt bei unverändertem Wert in „Form der Crew“ `± 0,00`
- `logbuch.css`
  - begrenzt mobile Wertungs-Badges auf ihre Tabellenzelle
  - verhindert die Worttrennung von „WERTUNG“
  - unterscheidet positive und negative Kursbewegung innerhalb der bestehenden Namens-Badges
- `VERSION.txt`
  - Version auf `4.9.2-HF12-HF30-TEST30` erhöht

## Pflichtprüfung in Test2-v2

1. Mobil: „Wer hat’s gerochen?“ bei schmaler und normaler Breite öffnen.
2. Prüfen, dass „WERTUNG“ vollständig lesbar bleibt und kein Tendenz-Badge aus der Tabelle ragt.
3. „Form der Crew“ prüfen: positive Werte bleiben erhalten, unveränderte Werte erscheinen als `± 0,00`.
4. „Kursbewegung“ prüfen: `PochzerJung ▲ +57` und `Yauguru ▼ −86` werden angezeigt.
5. Desktopansicht und ältere Logbucheinträge auf Regressionen prüfen.

## Nicht enthalten

- keine Admin-Änderung
- keine Datenänderung
- keine Live-Übernahme
- keine Änderung an Grid, Kachelgrößen, Navigation oder Grundlayout

