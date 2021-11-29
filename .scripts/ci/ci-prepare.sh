#!/bin/bash

if [ -n "$TIMEZ" ]; then
  ln -sf /usr/share/zoneinfo/${TIMEZ} /etc/localtime
  echo "$TIMEZ" > /etc/timezone
fi

# git config --system core.fileMode false
# git config --global core.fileMode false

