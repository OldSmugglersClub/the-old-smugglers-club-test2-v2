# TOSMC – 11 Anstoßzeitpunkte: kontrollierte TEST2v2-Übernahme

Stand 28.10.2026. **Kein LIVE, kein Admin, kein vNext-Simulation-Repository.**

## Zweck
Der bereits erfolgreich ausgeführte manuelle Prüfworkflow bleibt unverändert bestehen. Dieses Paket ergänzt einen **separaten**, nur manuell auslösbaren GitHub-Actions-Workflow für die mögliche spätere Übernahme einer amtlich bestätigten Änderung des Anstoßzeitpunkts in TEST2v2.

## Ins TEST2v2-Repository kopieren – exakt vier Dateien
1. `.github/workflows/tosmc-test2v2-11-terminuebernahme.yml` (neu)
2. `scripts/tosmc-test2v2-11-terminuebernahme.mjs` (neu)
3. `scripts/TEST_tosmc_test2v2_terminuebernahme.mjs` (neu)
4. `README_TEST2V2_TERMINUEBERNAHME.md` (neu)

**Keine vorhandenen Dateien ersetzen.** Alle vier Dateien werden neu hinzugefügt. **Die bestehenden Skripte und die offizielle Quellen-Konfiguration aus dem vorher erfolgreich getesteten Prüfpaket müssen vorhanden sein.** Das Paket enthält absichtlich weder `spieldaten.json` noch `schedule-terminstand.json`.

## Prüfung
1. Das ZIP entpacken und die vier Dateien mit ihrer Pfadstruktur ins lokale `the-old-smugglers-club-test2-v2` kopieren.
2. In GitHub Desktop sicherstellen, dass **nur vier neue Dateien** erscheinen, dann committen und zu TEST2v2/main pushen.
3. GitHub → Aktionen → `TOSMC TEST2v2 – 11 Anstosszeitpunkte kontrolliert uebernehmen`.
4. Zunächst **Modus `VORSCHAU`** und Freigabetext leer lassen.
5. Den GitHub-Bericht `TOSMC-TEST2V2-11-TERMINUEBERNAHME` auswerten. Es wird NICHTS geändert.

## Übernahme (noch nicht freigegeben)
`UEBERNEHMEN` ist nur nach separater ausdrücklicher Freigabe des Projektverantwortlichen vorgesehen. Dann verlangt der Workflow zusätzlich den exakt übereinstimmenden Freigabetext `TEST2V2_NUR_11_ANSTOSSZEITPUNKTE`. Keine automatische Zeitplanung.

Die Übernahme prüft die offiziellen Quellen neu, übernimmt nur eindeutige Abweichungen innerhalb von 56 Tagen und ändert ausschließlich `datum`, `datumVon`, `datumBis`, `datumAnzeige`, `anstoss` für maximal elf feste Spiel-IDs sowie gegebenenfalls entsprechende bereits vorhandene Datums-/Zeitwerte in `schedule-terminstand.json`. Fremde Wettbewerbe, Paarungen, Runden, Ergebnisse, Wertungen, Status, Versionsangaben und Admin werden nicht angetastet. Offene Terminangaben aus Frankreich und Portugal bleiben unverändert, bis sie exakt offiziell feststehen.

Alle Schreibworkflows in TEST2v2 verwenden dieselbe Concurrency-Gruppe wie die vorhandene Bundesliga-/Dynamo-Automatik. Vor einem Push wird zusätzlich geprüft, ob `main` seit dem Checkout geändert wurde. Ein fehlender offizieller Nachweis oder ein bereits identischer Termin führt zu keinem Commit.

## Nachgewiesen / noch offen
- Lokale vorhandene Schutztests und neuer Test erfolgreich.
- Erster vorangegangener REALER reiner Terminprüflauf: 9/11 amtlich verifiziert, 2 noch nicht sicher feststehend, 0 Abweichungen; keine Daten verändert.
- Der neue separate GitHub-Workflow ist **noch nicht live auf GitHub gelaufen**. Ein echter Änderungslauf ist **noch nicht abgenommen**.
- Eine spätere LIVE-Übernahme ist ein separater Freigabe- und Prüfprozess nach TEST2v2-Abnahme.
