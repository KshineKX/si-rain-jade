@echo off
cd /d "%~dp0"
node tools\check-compat.mjs
pause
