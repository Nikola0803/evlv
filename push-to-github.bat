@echo off
cd /d "%~dp0"
echo Adding EVLV site changes...
git add -- evlv-site
if errorlevel 1 goto :failed

git diff --cached --quiet
if errorlevel 1 (
  echo Committing...
  git commit -m "Update EVLV storefront"
  if errorlevel 1 goto :failed
) else (
  echo No new site changes to commit.
)

echo Integrating the latest GitHub main branch...
git pull --rebase origin main
if errorlevel 1 goto :failed

echo Pushing main to GitHub...
git push -u origin main
if errorlevel 1 goto :failed

echo.
echo Main is up to date on GitHub.
goto :done

:failed
echo.
echo Git stopped before completion. Review the error above. Nothing was force-pushed.

:done
echo Press any key to close.
pause
