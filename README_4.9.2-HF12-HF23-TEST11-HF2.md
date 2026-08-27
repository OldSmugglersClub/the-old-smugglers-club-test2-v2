# The Old Smugglers Club – Website 4.9.2-HF12-HF23-TEST11-HF2

Diese Testversion basiert auf `4.9.2-HF12-HF23-TEST11-HF1` und enthält ausschließlich den freigegebenen Champions-League-HF2-Testfix.

## Verhalten

OpenLigaDB wird bei jedem Laden der Champions-League-Seite neu abgefragt. Solange die Ligaphase noch keine belastbare Zuordnung auf acht Spieltage erlaubt, zeigt die Website nur einen kompakten Status statt der ungeordneten Rohpaarungen. Sobald 144 Spiele als acht plausible Spieltage mit je 18 Begegnungen und 36 eindeutigen Teams erkennbar sind, schaltet die Seite ohne neues Update automatisch auf die reguläre Spieltagsansicht um.

Wappen werden bevorzugt aus den lokalen Vereinsstammdaten geladen. Für noch nicht lokal hinterlegte CL-Teams ist nur ein validierter HTTP(S)-Fallback aus OpenLigaDB zugelassen; eingebettete Base64-Bilder werden nicht verwendet.

## Einsatz

Nur für `Test2-v2`. Live bleibt unverändert.
