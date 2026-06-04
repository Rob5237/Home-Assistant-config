#!/bin/bash
# Automatische GitHub backup van Home Assistant configuratie
# Bij push-fout: persistent notification via Supervisor API zodat de fout
# niet stil blijft (anders zou de repo dagen kunnen achterlopen).
cd /config

notify_failure() {
  local msg="$1"
  curl -s -X POST \
    -H "Authorization: Bearer $SUPERVISOR_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"title\": \"GitHub backup mislukt\", \"message\": \"$(date '+%Y-%m-%d %H:%M'): $msg\", \"notification_id\": \"github_backup_fail\"}" \
    http://supervisor/core/api/services/persistent_notification/create >/dev/null
}

git add -A
git diff --cached --quiet && echo "Geen wijzigingen, niets te pushen." && exit 0

if ! git commit -m "Auto-backup $(date '+%Y-%m-%d %H:%M')"; then
  notify_failure "git commit faalde"
  exit 1
fi

PUSH_OUTPUT=$(git push origin master 2>&1)
PUSH_RC=$?
if [ $PUSH_RC -eq 0 ]; then
  echo "Push geslaagd."
else
  echo "Push mislukt (rc=$PUSH_RC): $PUSH_OUTPUT"
  SAFE_OUTPUT=$(echo "$PUSH_OUTPUT" | head -c 300 | tr -d '"' | tr '\n' ' ')
  notify_failure "git push faalde (rc=$PUSH_RC). Output: $SAFE_OUTPUT"
  exit $PUSH_RC
fi
