# The Old Smugglers Club – TEST19

Version: **4.9.2-HF12-HF26-TEST19**
Basis: **4.9.2-HF12-HF26 (Live)**

## Zweck
TEST19 prüft das freigegebene Landgang-Outro als getrenntes Modul, ohne das bestehende Grundlayout umzubauen.

## Bedienung
1. Website öffnen.
2. Desktop: in der Menüleiste auf **Landgang** klicken.
3. Mobil: Menü öffnen und den letzten Punkt **Landgang** auswählen.
4. Die geöffnete Schatztruhe schließt sich mit synchronisiertem Klang.
5. Anschließend versucht die Seite, den Tab/das Fenster zu schließen.
6. Wird das vom Browser blockiert, bleibt eine schwarze Abschlussansicht sichtbar.

## Technischer Hinweis zum Schließen
Normale Browser-Tabs dürfen von Websites häufig nicht programmatisch geschlossen werden. TEST19 behandelt dies bewusst als Fallback-Fall. Die Outro-Animation und der Ton funktionieren unabhängig davon.

## Testschwerpunkte
- Menüpunkt sitzt auf Desktop und Mobil korrekt als letzter Eintrag.
- Kein Umbruch/Überdecken der Navigation auf typischen Desktopbreiten.
- Schatztruhe ist beim Einstieg bereits geöffnet.
- Gold/Schmuck ist vor dem Zuklappen sichtbar.
- Deckelschlag und Sound wirken synchron und nicht comicartig.
- Nach dem Outro funktioniert die Abschlussansicht, wenn `window.close()` verweigert wird.
- Intro und restliche Website bleiben unverändert.

## Installation
UPDATE-ZIP über den bestehenden Test2-v2-Stand **HF26** kopieren. Neue Dateien hinzufügen und vorhandene Dateien ersetzen. Danach Browsercache mit Strg+F5 aktualisieren.
