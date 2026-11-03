@echo off
cd /d "%~dp0"
node tools\manage.mjs install --apply
pause
