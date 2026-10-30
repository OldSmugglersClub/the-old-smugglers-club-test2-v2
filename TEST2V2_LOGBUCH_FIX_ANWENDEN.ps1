$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$jsPath = Join-Path $root 'logbuch.js'
if (-not (Test-Path (Join-Path $root 'logbuch.css')) -or -not (Test-Path $jsPath) -or -not (Test-Path (Join-Path $root 'logbuch.html'))) {
  throw 'STOPP: Dieses Paket muss in das Stammverzeichnis des TEST2v2-Repositories entpackt werden.'
}
$utf8 = New-Object System.Text.UTF8Encoding($false)
$original = [System.IO.File]::ReadAllText($jsPath, [System.Text.Encoding]::UTF8)
$changed = $original
function Replace-ExactlyOnce([string]$old, [string]$new, [string]$label) {
  $count = ([regex]::Matches($script:changed, [regex]::Escape($old))).Count
  if ($count -ne 1) { throw "STOPP: $label - erwartet eine Fundstelle, gefunden: $count. Keine Datei veraendert." }
  $script:changed = $script:changed.Replace($old, $new)
}
# Der Wettbewerbsname wird vor der Anzeige nur bei einer direkten Dopplung gekuerzt.
Replace-ExactlyOnce 'const competition=esc(keepSpieltag(entry.bezeichnung||entry.runde||entry.wettbewerb||"Spieltag"));' 'const rawCompetition=keepSpieltag(entry.bezeichnung||entry.runde||entry.wettbewerb||"Spieltag").replace(/^piratenkodex\s+(?=piratenkodex\b)/i,""); const competition=esc(rawCompetition);' 'Doppelter Piratenkodex-Titel'
# Bestehende zentrale Teambezeichnungen nutzen; keine Daten-, Wertungs- oder Tipp-Aenderung.
Replace-ExactlyOnce '${esc(f.heimTeam)} – ${esc(f.auswaertsTeam)} · ${esc(f.ergebnis||"")}' '${esc(teamDisplayName(f.heimTeam))} – ${esc(teamDisplayName(f.auswaertsTeam))} · ${esc(f.ergebnis||"")}' 'Partie im Detailbericht'
Replace-ExactlyOnce 'text:`Bei ${f.heimTeam} – ${f.auswaertsTeam} lag die Außenseiterseite' 'text:`Bei ${teamDisplayName(f.heimTeam)} – ${teamDisplayName(f.auswaertsTeam)} lag die Außenseiterseite' 'Partie in der Zusammenfassung'
if ($changed -eq $original) { throw 'STOPP: Keine Aenderung erzeugt.' }
[System.IO.File]::WriteAllText($jsPath, $changed, $utf8)
Write-Host ''
Write-Host 'TEST2v2 Logbuch-Korrektur angewendet: ausschliesslich logbuch.js' -ForegroundColor Green
Write-Host 'Bitte in GitHub Desktop ausschliesslich logbuch.js als Aenderung committen.'
Write-Host 'Die beiden Installationsdateien NICHT committen; nach der Anwendung loeschen.'
