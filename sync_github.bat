@echo off
echo Syncing changes to GitHub...
git add .
git commit -m "Automatic update %date% %time%"
git push origin main
echo.
echo Done!
pause
