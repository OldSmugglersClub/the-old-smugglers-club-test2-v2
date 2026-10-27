#!/usr/bin/env python3
"""User-controlled, fail-closed patch against a verified TEST12 source file."""
from pathlib import Path
import hashlib,sys
if len(sys.argv)!=2:
    raise SystemExit('Aufruf: python apply_test13.py PFAD_ZUM_TEST2V2_REPO')
repo=Path(sys.argv[1]).resolve()
p=repo/'scripts/offizielle-quellen-browser.mjs'
if not p.is_file():raise SystemExit('ABBRUCH: Zieldatei fehlt')
b=p.read_bytes()
sha=hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
if sha!='28e8f2298bc79e073d3acae1e9f629c52023cee4':
    raise SystemExit('ABBRUCH: Git-Blob-SHA ungleich geprüftem TEST12-Stand: '+sha)
old="if(body.length>2_000_000){if(isMatch)antwortDiagnose.push({pfad,status:'ANTWORT_ZU_GROSS',bytes:body.length});return;}"
new="if(body.length>(provider==='portugal'&&isMatch?6_000_000:2_000_000)){if(isMatch)antwortDiagnose.push({pfad,status:'ANTWORT_ZU_GROSS',bytes:body.length});return;}"
text=b.decode('utf8')
if text.count(old)!=1:raise SystemExit('ABBRUCH: Erwarteter Code nicht exakt einmal gefunden')
updated=text.replace(old,new,1)
assert updated.replace(new,old,1)==text
p.write_bytes(updated.encode('utf8'))
print('OK: Nur Portugal-Limit auf 6 MB erweitert; andere Antworten bleiben bei 2 MB.')
print('Neu: '+hashlib.sha256(p.read_bytes()).hexdigest())
