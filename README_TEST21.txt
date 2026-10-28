TOSMC TEST21 – Manueller Draft-Pull-Request ausschließlich für TEST2v2
Stand: 28.10.2026

Paket enthält:
- .github/workflows/tosmc-test21-manueller-test2v2-pr.yml (NEU)
- scripts/offizielle-quellen-test21-pr.mjs (NEU)
- scripts/TEST_offizielle_quellen_TEST21.mjs (NEU)
- scripts/offizielle-quellen-test19-vorschau.mjs (geändert: kein Fehler bei 0 Abweichungen)
- scripts/offizielle-quellen-test20-freigabe.mjs (geändert: kein Release bei 0 Abweichungen)

WICHTIG:
- Diagnose-/Zeitplan-Workflow bleibt UNVERÄNDERT und READ-ONLY.
- Dieser separate Workflow kann NUR über workflow_dispatch gestartet werden.
- Er erstellt NUR einen DRAFT-Pull-Request in TEST2v2, niemals einen direkten
  Push auf main, Merge oder LIVE-Änderung.
- Damit ist die im TEST20 weiterhin manuell durchgeführte Dateikopie bei einer
  künftigen echten Abweichung optional durch einen PR ersetzbar.
- GitHub darf für GitHub Actions das Anlegen von Pull Requests erlauben müssen.
  Ist dies deaktiviert, schlägt der Workflow sicher fehl, ohne main zu ändern.
- Ein NEUER, erfolgreicher TEST20-Quelllauf ist erforderlich, der nach
  dem Einspielen dieses TEST21-Pakets auf dem unveränderten main läuft,
  tatsächlich neue Abweichungen hat und ausdrücklich für TEST2v2 freigegeben ist.
- Der frühere TEST20-Lauf mit den sechs inzwischen eingespielten Terminen ist
  NICHT als Quelle nutzbar: GitHub HEAD und Quell-SHA passen nicht mehr.
- Solange keine neuen Abweichungen vorliegen, NICHT den Draft-PR-Workflow starten.

Einspielen:
1. ZIP entpacken und .github + scripts in lokales TEST2v2-Repo kopieren.
2. In GitHub Desktop: nur die fünf beschriebenen Dateien prüfen.
3. Commit + Push origin NUR im TEST2v2-Repository.
4. TEST21-Schutztests sind lokal bestanden; danach bei Gelegenheit den normalen
   Diagnose-Workflow ohne Freigabeeingaben starten (kein PR, keine Datenänderung).
5. Den neuen Workflow 'TOSMC TEST21 – Manueller TEST2v2-Korrekturvorschlag'
   NICHT ohne neuen, freigegebenen Quelllauf auslösen.

Wenn künftig echte Termine abweichen:
A. Regulären TEST20-Diagnose-Workflow mit manueller Freigabe und Quell-SHA starten.
B. Im neuen TEST21-Workflow Quelllauf-ID, seine Quell-SHA und
   exakt TEST2V2_PR_ERSTELLEN eingeben.
C. Entstandenen Draft-PR prüfen (nur spieldaten.json, Termine, Schutztests).
D. Erst nach expliziter menschlicher Bestätigung PR manuell zusammenführen,
   Website kontrollieren, danach gesonderte LIVE-Freigabe.

Schutz: GitHub main, LIVE, Admin5, vNext, Bundesliga, CL, Kicktipp-Wertungen
bleiben bis zur expliziten manuellen Freigabe unverändert.
