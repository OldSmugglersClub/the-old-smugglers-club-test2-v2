# CHANGELOG – 4.9.2-HF12-HF26-TEST20-HF4

- Alle funktionalen Links zur Tipprunde auf der Website auf `Kicktipp Live Action` migriert.
- Gemeinsames Ziel: `./kicktipp.html?path=/tippuebersicht`.
- Spieltagskachel bereinigt: nur noch ein Kicktipp-Live-Action-Button.
- Kicktipp-Integration optisch deutlich stärker an TOSMC angepasst: dunkle Holz-/Lederwirkung, Messingrahmen, gravurartige Details, keine weiße Restfläche des Host-Containers.
- Startlogik erweitert: Ziel `/tippuebersicht` wird aus dem Seitenparameter übernommen; zusätzlich wird nach dem Laden innerhalb der integrierten DOM-Ausgabe gezielt die Tippübersicht angesteuert, falls Kicktipp den Startparameter ignoriert.
- Direkter Kicktipp-Zugang innerhalb der Integrationsseite bleibt als unabhängiger Fallback bestehen.
- Datenschutz-Link zu Kicktipp bleibt bewusst unverändert.
