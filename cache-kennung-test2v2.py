#!/usr/bin/env python3
"""Nur die Wettbewerb-JS-Cache-Kennung in bestehenden Test2v2-HTML-Dateien angleichen."""
from pathlib import Path
import re, sys
root = Path(sys.argv[1] if len(sys.argv)>1 else ".").resolve()
files = ["bundesliga.html", "dfb-pokal.html", "champions-league.html", "europa-league.html", "relegation.html", "dynamo-dresden.html", "piratenkodex.html", "weihnachtsregatta.html"]
new_version = "4.9.2-HF12-HF101-TEST18-DFB1"
pattern = re.compile(r'(wettbewerb\.js\?v=)[^"\']+')
updates = {}
for name in files:
    path = root / name
    if not path.is_file(): raise SystemExit(f"FEHLT: {path}")
    original = path.read_text(encoding="utf-8")
    changed, count = pattern.subn(lambda m: m.group(1) + new_version, original)
    if count != 1: raise SystemExit(f"ABBRUCH: {name} hat {count} Referenzen")
    updates[path] = changed
for path, changed in updates.items():
    path.write_text(changed, encoding="utf-8")
    print("Cache angepasst:",path.name)
print("Fertig. Release Guard im Repository ausführen.")
