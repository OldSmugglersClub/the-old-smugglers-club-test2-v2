# TOSMC offizielle Quellen – TEST6, gezieltes Parser-Update

## Zweck
Ersetzt im **bestehenden** Test2v2-Repository ausschließlich `scripts/offizielle-quellen.mjs` und ergänzt `scripts/TEST_offizielle_quellen_TEST6.mjs`. Kein neues Repo, kein neuer Workflow. Kein Eingriff in `spieldaten.json`, Kicktipp oder bestehende Bundesliga-/CL-/Dynamo-Automatiken.

## Änderungen
- Zusätzliche Erkennung von Begegnungen in eingebetteten `application/json`- und Next.js-JSON-Daten. Keine heuristische Interpretation freier Texte.
- Deduplizierung identischer Spielansetzungen aus JSON-LD und eingebetteten JSON-Daten.
- Bis zu drei Abrufversuche mit HTTPS-Weiterleitungen ausschließlich innerhalb der konfigurierten freigegebenen Domainfamilie.
- Abrufversuche und End-URL (ohne Übernahme in die Website) im JSON-Bericht.
- Zeitpunkte nur bei expliziter UTC-Zeit oder Zeitzonen-Offset; Umrechnung Europe/Berlin.

## Installation und Test
1. Beide Dateien ins bestehende Test2v2-Repository übernehmen; vorhandenes `scripts/offizielle-quellen.mjs` gezielt ersetzen.
2. Commit/Push durch den Repository-Verantwortlichen, nicht durch KI.
3. GitHub Actions: **TOSMC TEST2v2 – Offizielle Terminquellen (nur Diagnose)** → Run workflow. Das vorhandene Workflow-Skript ruft das aktualisierte `scripts/offizielle-quellen.mjs` automatisch auf.
4. Artifact `tosmc-test2v2-offizielle-quellen-diagnose` bereitstellen. Exit-Code 2 ist solange erwartet, wie Quellen nicht verifizierbar sind.

## Grenzen (wichtig)
Der vorhandene Bericht vom 27.10.2026 beweist bislang **0/11** verifizierte Termine. Diese Revision behandelt zwei nachgewiesene technische Lücken (JSON-Daten, Netzwerk-Retry), ist aber **kein Nachweis**, dass Serie A, Ligue 1, Liga Portugal oder Premier League jetzt die nötigen Begegnungen ausliefern. Manche Seiten verlangen spezifische APIs oder clientseitiges Rendering. Es erfolgt keinerlei automatische Änderung an TOSMC-Daten. Eine tatsächliche Quellenbestätigung und ein kompletter Integrationstest sind weiterhin notwendig.

## Schutz
- Keine Installation in LIVE.
- Kein Ersetzen einer kompletten alten `main.zip`.
- Bereits aktive Terminimporte bleiben unverändert.
- Keine Aussage „geprüft“, solange nicht jede offene Begegnung eindeutig verifiziert ist.
