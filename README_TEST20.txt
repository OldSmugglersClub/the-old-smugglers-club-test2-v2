TOSMC TEST20 – kontrollierte Korrekturfreigabe NUR fuer TEST2v2

Einspielen:
1. ZIP entpacken und .github/ und scripts/ in das lokale TEST2v2-Repository kopieren.
2. In GitHub Desktop Diff kontrollieren: 1 Workflow + 2 neue TEST20-Dateien.
3. Commit und Push auf TEST2v2/main, danach den offiziellen Terminquellen-Workflow manuell starten.
4. Die beiden neuen TEST20-Eingabefelder beim ERSTEN Lauf LEER lassen.
5. TEST20_STATUS.json muss NICHT_FREIGEGEBEN anzeigen; KEINE austauschbare spieldaten.json darf entstehen.
6. KI prueft den neuen Lauf und den SHA256-Wert im TEST19_MANIFEST.json.

Nach separat erteilter TEST2v2-Freigabe:
- Ein NEUER manueller GitHub-Lauf mit test20_freigabe=TEST2V2_FREIGABE und
  test20_bestands_sha256=<quelleHashSHA256 aus dem aktuellsten TEST19_MANIFEST.json>
  gibt bei unveraendertem Bestand einen Austausch-Kandidaten als GitHub-Artefakt frei.
- Der Workflow schreibt niemals selbst ins Repository. Die Datei muss nach abschliessender
  Sichtkontrolle des GitHub-Desktop-Diffs durch den Nutzer in TEST2v2 eingespielt werden.
- Eine LIVE-Freigabe ist dadurch NICHT erteilt. LIVE erst nach bestaetigter TEST2v2-Funktion.

Sicherheit:
- Tägliche schedule-Laeufe koennen nie Freigabedateien erzeugen.
- READ-ONLY GitHub-Berechtigung, keine Website- oder Git-Aenderungen.
- Bestands-/Kandidaten-Hash, Anzahl, Datenversion und sechs konkrete Vorschlaege
  muessen mit TEST19 uebereinstimmen; sonst Abbruch.
- Schutztests: sieben positive und negative Faelle lokal bestanden.
- Integration: echter TEST19-Lauf vom 28.10.2026, sechs Kandidaten, SHA256 exakt bestaetigt.
