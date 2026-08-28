# CHANGELOG – 4.9.2-HF12-HF26-TEST20-HF7

## Änderung

- `update_data.py` erzeugt jetzt denselben vollständigen Kicktipp-Live-Action-Link wie der erfolgreich getestete Stand TEST20-HF6.
- Ergänzt wurde der von Kicktipp verwendete Routing-Parameter `br_p=%2Fthe-old-smugglers-club%2Ftippuebersicht`.
- Dadurch kann eine spätere Ausführung von `update_data.py` den funktionierenden HF6-Link nicht mehr auf den früheren HF5-Aufruf zurücksetzen.

## Nicht geändert

- Keine Änderung an `kicktipp.html`.
- Keine Änderung an Grid, Kachelgrößen, Navigation, Grundlayout oder Design.
- Keine Änderung an Admin-Dateien.
- Keine weiteren Funktions- oder Datendateien geändert.

Testbasis: `4.9.2-HF12-HF26-TEST20-HF6`.
