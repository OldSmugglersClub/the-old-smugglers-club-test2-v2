TOSMC TEST27 – ZUSATZSCHUTZ FUER DRAFT-PR – NUR TEST2v2

Zweck: Bindet die manuelle Draft-PR-Erstellung aus TEST21 an das bestandene TEST25 Quellen-Gate.
TEST27 erlaubt KEIN automatisches PR, KEIN Merge und KEINE LIVE-Aenderung.

Dateien:
- .github/workflows/tosmc-test21-manueller-test2v2-pr.yml (bestehenden Workflow ersetzen)
- .github/workflows/tosmc-test27-pr-schutztest.yml (NEU: gefahrloser manueller Test)
- scripts/offizielle-quellen-test27-pr-guard.mjs (NEU)
- scripts/TEST_offizielle_quellen_TEST27.mjs (NEU)

INSTALLATION:
1. Im TEST2v2-Repository Fetch/Pull in GitHub Desktop.
2. Nur die vier oben genannten Dateien in ihren relativen Pfaden kopieren.
3. GitHub Desktop Diff kontrollieren; committen und Push origin.
4. GitHub Actions: NUR "TOSMC TEST27 – Draft-PR Sicherheitsprüfung (READ ONLY)" manuell starten.
5. Artefakt TOSMC-TEST27-SCHUTZBERICHT herunterladen oder Lauf-ID melden.

NICHT STARTEN: "TOSMC TEST21/27 – Manueller TEST2v2-Draft-PR mit Quellen-Gate".
Dieser Workflow wird spaeter NUR bei einer echten, pruefbaren Abweichung und nach gesonderter expliziter PR-Freigabe genutzt.

Schutzregel: Fehlender oder fehlerhafter TEST25-Bericht, widerspruechlicher Browserbefund,
fehlender TEST22-Monitor, ungueltige TEST20-Freigabe oder abweichender Hash blockiert den PR.
Vorhandene TEST21-Kontrollen auf Run-Quelle, HEAD-SHA und Draft-Only bleiben erhalten.

Alle Testdaten werden ausschliesslich kuenstlich erzeugt. spieldaten.json nicht anfassen.
LIVE, Admin5 und vNext nicht anfassen.
