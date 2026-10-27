# TOSMC TEST8 – gezielte offizielle Liga-Adapter

**Nur im bestehenden Test2v2-Repository einsetzen. Keine Änderung an LIVE, Bundesliga-/CL-/Dynamo-Automatiken, Kicktipp, Ergebnissen, Wertungen oder Website-Daten.**

## Dateien nach Test2v2 übernehmen

1. `scripts/offizielle-liga-adapter.mjs` – NEU
2. `scripts/offizielle-quellen-browser.mjs` – BESTEHENDE TEST7-DATEI ERSETZEN
3. `scripts/TEST_offizielle_quellen_TEST8.mjs` – NEU
4. `.github/workflows/tosmc-test2v2-offizielle-terminquellen-diagnose.yml` – BESTEHENDEN DIAGNOSE-WORKFLOW ERSETZEN

Der neue Adapter versucht ausschließlich die in TEST7 tatsächlich beobachteten offiziellen Endpunkte auszuwerten:
- `api-sdp.legaseriea.it/.../matches` (Serie A)
- `api.premierleague.com/broadcasting/match-events` (Premier League)
- `www.ligaportugal.pt/api/v1/competition/matches` (Liga Portugal)

Die genauen Felder der realen API-Antworten sind **noch nicht empirisch bestätigt**. Deshalb liefert TEST8 zusätzlich `schemaBefunde` im `BROWSER_QUELLEN_BERICHT.json`: Anzahl Knoten, Teams/Termin-Kandidaten, erkannte Spiele, häufige Feldmuster – ohne vollständige Nutzdaten mitzuschreiben. Der Report wird auch bei Exit-Code 2 hochgeladen. Dies ist ein Diagnosekandidat, KEINE produktive Freigabe.

Die Quelle Ligue 1 ist mangels eines beobachteten Match-Endpunkts weiterhin offen. Auch UEFA/DFB haben im hochgeladenen Stand noch keine TOSMC-Einzelspiele.

## Prüfung

Im bestehenden Test2v2-Repository GitHub → Actions → **TOSMC TEST2v2 – Offizielle Terminquellen (nur Diagnose)** → **Run workflow**. Danach wird das Artifact ausgelesen. Keine weiteren Repositorys und keine Website-Änderungen.

**Wichtig:** Die vorhandene HTML-Diagnose kann weiterhin mit Exit-Code 2 scheitern; der Browser-Schritt wird danach trotzdem ausgeführt. Der gesamte Workflow meldet erst Erfolg, wenn beide notwendigen Prüfungen erfolgreich sind. Aus `Exit 2` folgt kein Schaden am Repository.
