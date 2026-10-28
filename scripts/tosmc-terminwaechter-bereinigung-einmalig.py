#!/usr/bin/env python3
"""Einmalige TOSMC-Terminwaechter-Bereinigung in TEST2v2.

Vor der Freigabe: reiner Trockenlauf. Im Freigabemodus genau ein Fast-Forward-
Commit nach TEST2v2/main, nie nach LIVE. Nie ausserhalb der statischen Liste loeschen.
"""
import json
import os
import pathlib
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
MANIFEST = ROOT / 'cleanup/terminwaechter-entfernen.json'
GUARD = 'TERMINWAECHTER_VERWORFEN_TEST2V2'
REPO = 'OldSmugglersClub/the-old-smugglers-club-test2-v2'
HANDOVER = 'TOSMC_TERMINWAECHTER_VERWORFEN_2026-10-28.md'
WORKFLOW = '.github/workflows/tosmc-terminwaechter-bereinigung-einmalig.yml'
SCRIPT = 'scripts/tosmc-terminwaechter-bereinigung-einmalig.py'


def cmd(*args, check=True):
    p = subprocess.run(args, cwd=ROOT, text=True, capture_output=True)
    if check and p.returncode:
        raise RuntimeError(f"Befehl fehlgeschlagen: {' '.join(args)}\n{p.stderr.strip()}")
    return p.stdout.strip()


def fail(msg):
    raise RuntimeError('SICHERHEITSSTOPP: ' + msg)


def report(msg):
    print(msg, flush=True)
    summary = os.environ.get('GITHUB_STEP_SUMMARY')
    if summary:
        with open(summary, 'a', encoding='utf-8') as f:
            f.write(msg + '\n')


def inspect(manifest, tracked):
    names = manifest['files_to_delete']
    protected = set(manifest['protected_paths'])
    if len(names) != len(set(names)) or any(p in protected for p in names):
        fail('Doppelte oder geschuetzte Dateinamen in der Loeschliste')
    if manifest.get('repository') != REPO:
        fail('Falsches Repository im Bereinigungsplan')
    for name in names:
        p = pathlib.PurePosixPath(name)
        if p.is_absolute() or '..' in p.parts or not name or '\\' in name:
            fail('Ungueltiger Loeschpfad: ' + name)
    if not set(manifest['mandatory_workflows']).issubset(tracked):
        fail('Mindestens ein urspruenglicher Terminwaechter-Workflow fehlt; Plan erneut pruefen')
    if not set(manifest['protected_paths']).issubset(tracked):
        fail('Geschuetzte Bestandsdatei fehlt; keine Bereinigung')
    unknown = set(names) - tracked
    if unknown:
        fail('Loeschliste weicht vom aktuellen Bestand ab: ' + ', '.join(sorted(unknown)))
    if HANDOVER in tracked:
        fail('Handover-Nachtrag existiert bereits, keine Ueberschreibung')
    return names


def main():
    os.chdir(ROOT)
    mode = os.environ.get('TOSMC_CLEANUP_MODE', 'TROCKENLAUF')
    approval = os.environ.get('TOSMC_CLEANUP_APPROVAL', '')
    if mode not in ('TROCKENLAUF', 'ENTFERNEN'):
        fail('Unbekannter Modus')
    if os.environ.get('GITHUB_REPOSITORY') != REPO:
        fail('Nur TEST2v2 erlaubt')
    if os.environ.get('GITHUB_REF') != 'refs/heads/main':
        fail('Nur von TEST2v2/main aufrufen')
    if mode == 'ENTFERNEN' and approval != GUARD:
        fail('Expliziter Freigabetext fehlt')
    if cmd('git', 'status', '--porcelain'):
        fail('Arbeitsverzeichnis nicht sauber')
    original_head = cmd('git', 'rev-parse', 'HEAD')
    remote_main = cmd('git', 'ls-remote', 'origin', 'refs/heads/main').split('\t')[0]
    if remote_main != original_head:
        fail('TEST2v2/main hat sich seit Checkout veraendert')
    if cmd('git', 'rev-parse', '--is-shallow-repository') != 'false':
        fail('Repository nicht vollstaendig ausgecheckt')
    manifest = json.loads(MANIFEST.read_text(encoding='utf-8'))
    tracked = set(cmd('git', 'ls-files').splitlines())
    targets = inspect(manifest, tracked)
    before = {p: cmd('git', 'hash-object', p) for p in manifest['protected_paths']}
    report(f'## TOSMC – Einmalige Bereinigung: {mode}')
    report(f'- Repository: {REPO}')
    report(f'- HEAD: `{original_head}`')
    report(f'- **{len(targets)} eindeutig eingegrenzte Dateien** zur Entfernung; darunter 4 Terminwaechter-Workflows.')
    for item in targets:
        report(f'  - `{item}`')
    if mode == 'TROCKENLAUF':
        report('- Ergebnis: **Nur geprueft. Keine Dateien veraendert.**')
        return
    handover = ROOT / HANDOVER
    handover.write_text(
        '# TOSMC – Terminwaechter verworfen und entfernt\n\n'
        '**Projektentscheidung: 28.10.2026.** Der Terminwaechter-Entwicklungsstrang '
        'TEST1–TEST28 wurde auf Wunsch des Projektverantwortlichen endgueltig verworfen. '\
        'Keine Wiederaufnahme ohne neuen ausdruecklichen Auftrag.\n\n'
        'Die taegliche ChatGPT-Terminwaechter-Automation wurde bereits deaktiviert. '
        'Die separaten Terminwaechter-GitHub-Workflows und exklusiven Skripte '\
        'werden in dieser Bereinigung ausschliesslich aus TEST2v2 entfernt.\n\n'
        '**Geschuetzt und unveraendert:** LIVE, Admin5, vNext, Kicktipp, '\
        'Bundesliga-Ergebnis-/Terminimport, Dynamo-Terminimport, OpenLigaDB, '\
        'Torjaegerlisten, Tabellen, Logbuch, historische Daten und Schutzpruefung.\n\n'
        'GitHub-Actions-Historie bleibt erhalten. Geschlossene Test28-PRs/alte Testbranches '\
        'werden hier nicht automatisch geloescht.\n\n'
        'Die bereinigende Aktion entfernt abschliessend auch ihren eigenen Workflow, '\
        'ihr Skript und ihren Dateiplan.\n', encoding='utf-8')
    cmd('git', 'rm', '--', *targets)
    cmd('git', 'add', '--', HANDOVER)
    changed = set(cmd('git', 'diff', '--cached', '--name-only').splitlines())
    expected = set(targets) | {HANDOVER}
    if changed != expected:
        fail('Aenderungsumfang entspricht nicht exakt der Freigabeliste')
    for p, sha in before.items():
        if not (ROOT / p).exists() or cmd('git', 'hash-object', p) != sha:
            fail('Bestandsschutz verletzt: ' + p)
    cmd('git', 'config', 'user.name', 'github-actions[bot]')
    cmd('git', 'config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com')
    cmd('git', 'commit', '-m', 'TOSMC: verworfenen Terminwaechter aus TEST2v2 entfernen')
    latest_remote = cmd('git', 'ls-remote', 'origin', 'refs/heads/main').split('\t')[0]
    if latest_remote != original_head:
        fail('Main wurde zwischen Pruefung und Push aktualisiert – kein Push')
    cmd('git', 'push', 'origin', 'HEAD:refs/heads/main')
    report('- Ergebnis: **Ein Bereinigungs-Commit nach TEST2v2/main erfolgreich gepusht.**')
    report('- Keine Aenderung an LIVE, Spielstaenden oder geschuetzten Skripten.')
    report('- Hinweis: Historische Workflow-Ausfuehrungen bleiben in GitHub sichtbar.')


if __name__ == '__main__':
    try:
        main()
    except Exception as exc:
        print(f'FEHLER – keine erfolgreiche Bereinigung bestaetigt: {exc}', file=sys.stderr)
        sys.exit(1)
