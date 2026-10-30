@echo off
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0TEST2V2_LOGBUCH_FIX_ANWENDEN.ps1"
if errorlevel 1 (
  echo.
  echo FEHLER: Keine oder keine vollstaendige Aenderung. Bitte das Fenster und Repository pruefen.
  pause
  exit /b 1
)
echo.
echo Fertig. Die beiden Installationsdateien vor dem Commit loeschen.
pause
