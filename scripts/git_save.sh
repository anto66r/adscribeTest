#!/bin/bash
BRANCH=$(git rev-parse --abbrev-ref HEAD | cut -d'-' -f1,2 | cut -d '/' -f2)
MESSAGE="$BRANCH: Stashing code"
if [ -z "$1" ]
then
  MESSAGE="$BRANCH: Stashing code"
else
  MESSAGE="$BRANCH: $*"
fi
git add -A && git commit -m "$MESSAGE"
git push
