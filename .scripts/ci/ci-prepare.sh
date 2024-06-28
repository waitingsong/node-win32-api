#!/bin/bash
set +e

os=$(uname)
msystem=$(echo "$MSYSTEM" | tr '[:upper:]' '[:lower:]')
echo os: $os
echo msystem: $msystem

if [ "$os" == "Linux" ]; then
  if [ -n "$TIMEZ" ]; then
    ln -sf /usr/share/zoneinfo/${TIMEZ} /etc/localtime
    echo "$TIMEZ" > /etc/timezone
  fi
fi

# git config --system core.fileMode false
# git config --global core.fileMode false

