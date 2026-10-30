TOSMC TEST2v2 – Remote-Schreibnachweis fuer elf Sonderwettbewerbsspiele

AUSSCHLIESSLICH in OldSmugglersClub/the-old-smugglers-club-test2-v2 einspielen.

Enthalten:
1. .github/workflows/tosmc-test2v2-11-remote-writeproof.yml
2. scripts/TEST_tosmc_11_remote_writeproof.mjs

Einspielung: beide Dateien in das lokale TEST2v2-Repository kopieren, ueber GitHub Desktop committen und pushen. Danach GitHub Actions > TOSMC TEST2v2 – 11 Termine – Remote-Schreibnachweis > Run workflow (main).

Ablauf: bestehende Regressionstests; kuenstlicher Terminwechsel in isoliertem Git-Worktree; kompletter JSON-Schutzvergleich; ausschliesslich spieldaten.json in einem temporaren Testbranch committen und nach GitHub pushen; Remote-SHA und Dateiinhalt vergleichen; Temp-Branch automatisch loeschen.

WICHTIG: kein manuelles UEBERNEHMEN der elf echten Termine starten. Dieses Paket aendert weder LIVE noch das TEST2v2-main-Spieldatenfile. Der simulierte Termin ist NIE eine echte amtliche Terminansetzung. Beim Fehler kann ein temporaerer Testbranch verbleiben; Bericht pruefen.

Grenze: Der Test beweist den GitHub-Write-/Push-Weg und den Terminplaner mit synthetischer amtlicher Abweichung, aber NICHT, dass eine kuenftige echte Quellenveraenderung automatisch erkannt oder live uebernommen wird.
