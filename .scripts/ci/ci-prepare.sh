#!/bin/bash

if [ -n "$TIMEZ" ]; then
  ln -sf /usr/share/zoneinfo/${TIMEZ} /etc/localtime
  echo "$TIMEZ" > /etc/timezone
fi

git config --system core.fileMode false
git config --global core.fileMode false
find "$cwd/.scripts/" -type f -iname "*.sh" -print0 | xargs -0i chmod +x {}
find "$cwd/.scripts/" -type f -iname "*.mjs" -print0 | xargs -0i chmod +x {}

