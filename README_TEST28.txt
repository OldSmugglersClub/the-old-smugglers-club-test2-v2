TOSMC TEST28 – Isolierter GitHub Draft-PR Integrationstest
NUR TEST2v2. KEIN LIVE. KEINE spieldaten.json-Änderung.

Enthalten:
.github/workflows/tosmc-test28-isolierter-draft-pr.yml
scripts/test28-isolierter-draft-pr.mjs
scripts/TEST_offizielle_quellen_TEST28.mjs

1. Alle Dateien mit den angegebenen relativen Pfaden ins lokale TEST2v2-Repo kopieren.
2. In GitHub Desktop genau diese drei NEUEN Dateien prüfen, committen, Push origin.
3. Zunächst NICHT den neuen Workflow mit Freigabetext starten. Die reine lokale/GitHub-Syntaxprüfung wird geprüft.
4. Nach separater ausdrücklicher Freigabe: TEST28-Workflow manuell starten und als Eingabe exakt TEST28_NUR_TESTDATEI_PR setzen.
5. Erwartet: Ein DRAFT Pull Request, der NUR test28-sandbox/TEST28_DRAFT_PR_ONLY.txt hinzufügt.
6. DRAFT PR NIEMALS MERGEN. Nach Sichtprüfung schließen und Test-Branch löschen.

HINWEIS: GitHub-Repository-Einstellungen können das Erzeugen von PRs durch Actions verhindern. Ein HTTP 403 darf nicht durch pauschale Rechteerweiterung umgangen werden. Erst Sicherheitsstatus prüfen.
Keine automatische Einspielung nach main. Keine Änderung von Spieldaten oder LIVE.
