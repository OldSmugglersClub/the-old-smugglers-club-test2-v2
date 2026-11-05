# TEST2v2-Website-Fix – Startseiten-Logbuch

Kennung: `TEST2v2-STARTLOGBUCH-WEEKDAY-HF1` · 05.11.2026

Ausgangsdatei: TEST2v2 `main/logbuch.js`, Git-Blob `73aafd92abf939c7d87624e9624a069176e36455`; byteidentisch mit der in `the-old-smugglers-club-main(20261105-024644).zip` enthaltenen Datei. Diese ZIP ist nur ein Transportnachweis für die identische Quelldatei, **keine Freigabe oder Datenbasis für einen Adminabschluss**.

Änderung: Nur `logbuch.js`, Funktionen `eventLastDate` und `weekendCardsHtml`. Startseite zeigt abgeschlossene Wochentagsereignisse, wenn diese neuer als der letzte Wochenendabschluss sind. Wochenendabschlüsse bleiben als Gruppe Freitag–Sonntag. Vollständige Logbuchseite und Daten unverändert.

Prüfungen: Node.js Syntax OK; drei Tests (CL nach Wochenende, Wochenende gruppiert, offene Ereignisse ausgeschlossen) OK. Noch offen: visuelle TEST2v2-Prüfung und Browserprüfung.

Ausgangs-SHA256: `42c848b7f79f6d14288b966c3c80c13cbec755607a9f8d0da7ea329dc1b05585`
Ziel-SHA256: `448ffad6fd011d31eb5d74936a8cdf35712ee6f8609380e63bb7f08fc4363368`

**Freigabe:** nur zur gezielten TEST2v2-Erprobung; keine LIVE-Freigabe. GitHub wurde nicht verändert. Vor Einspielung in GitHub Desktop prüfen, ob `logbuch.js` lokal inzwischen geändert wurde; bei Abweichung STOP.
