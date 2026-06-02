#!/bin/bash
# Automatische GitHub backup van Home Assistant configuratie
cd /config

git add -A
git diff --cached --quiet && echo "Geen wijzigingen, niets te pushen." && exit 0

git commit -m "Auto-backup $(date '+%Y-%m-%d %H:%M')"
git push origin master && echo "Push geslaagd." || echo "Push mislukt!"
