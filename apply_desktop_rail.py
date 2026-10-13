#!/usr/bin/env python3
"""Small, guarded HTML patch. Run against currently checked-out TEST2v2 repo."""
from pathlib import Path
import sys

if len(sys.argv) != 2:
    sys.exit('Aufruf: python apply_desktop_rail.py PFAD_ZUM_TEST2V2_REPOSITORY')
root=Path(sys.argv[1]).resolve()
p=root/'kicktipp.html'
if not p.is_file():sys.exit('STOP: kicktipp.html fehlt.')
s=p.read_text(encoding='utf-8')
if 'tosmc-desktop-rail' in s:sys.exit('STOP: Desktop-Leiste ist bereits vorhanden (kein doppeltes Einspielen).')
css_anchor='    @media (max-width: 720px) {'
html_anchor='        <div class="integration-fallback" id="kicktipp-fallback">'
if s.count(css_anchor)!=1 or s.count(html_anchor)!=1 or '.integration-content' not in s:
    sys.exit('STOP: Seitenstruktur weicht vom geprüften Stand ab. Keine Änderung.')
css='''    /* Nur große Desktop-Ansichten; Kicktipp-iframe und Mobile unangetastet. */
    .tosmc-desktop-rail { display: none; }
    @media (min-width: 1200px) {
      .tosmc-desktop-rail {
        display: flex;
        position: absolute;
        z-index: 4;
        top: 245px;
        right: 10px;
        width: 148px;
        min-height: 270px;
        padding: 16px 10px;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        border: 1px solid rgba(214,168,75,.45);
        border-radius: 10px;
        background: linear-gradient(160deg,rgba(30,19,9,.97),rgba(9,7,5,.98));
        box-shadow: 0 8px 20px rgba(0,0,0,.32),inset 0 0 12px rgba(214,168,75,.08);
        color: #f1d99a;
        text-align: center;
        pointer-events: none;
      }
      .tosmc-desktop-rail img { display: block; width: 76px; height: 76px; object-fit: contain; }
      .tosmc-desktop-rail strong { font-size: .9rem; line-height: 1.3; }
      .tosmc-desktop-rail span { font-size: .8rem; line-height: 1.4; color: #d3bc8a; }
      .tosmc-desktop-rail::after { content: "⚓"; color: #bc8a37; font-size: 1.65rem; }
    }
'''
html='''        <!-- Rein dekorative Desktop-Leiste: ohne Daten, Aktionen oder Kicktipp-Abhängigkeit. -->
        <aside class="tosmc-desktop-rail" aria-label="Old Smugglers Club – Dekoration">
          <img src="./logo.jpeg" alt="" aria-hidden="true">
          <strong>OLD SMUGGLERS CLUB</strong>
          <span>Saison 2026/2027</span>
        </aside>
'''
s2=s.replace(css_anchor,css+css_anchor,1).replace(html_anchor,html+html_anchor,1)
p.write_text(s2,encoding='utf-8')
print('OK: Nur kicktipp.html angepasst. Mobile unverändert; Versionsnummer noch nicht angefasst.')
