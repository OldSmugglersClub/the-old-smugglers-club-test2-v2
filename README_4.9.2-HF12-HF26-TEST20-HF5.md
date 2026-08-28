# README – TEST20-HF5

Ziel dieses Hotfixes ist ausschließlich der Start der Kicktipp-Integration direkt in der Tippübersicht.

Technisch wird der von Kicktipp für Integrationsadressen erlaubte Query-Parameter `path` jetzt als `path=tippuebersicht` übergeben. Der führende Slash aus HF4 wurde entfernt.

Test: Auf der Clubseite einen beliebigen `Kicktipp Live Action`-Button öffnen. Die Einbettung muss direkt die Tippübersicht zeigen.
