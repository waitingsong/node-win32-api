#!/bin/bash

ln -sf /usr/share/zoneinfo/Asia/Chongqing /etc/localtime
echo "Asia/Chongqing" > /etc/timezone

git config --system core.fileMode false
git config --global core.fileMode false
find "$cwd/.scripts/" -type f -iname "*.sh" -print0 | xargs -0i chmod +x {}
find "$cwd/.scripts/" -type f -iname "*.mjs" -print0 | xargs -0i chmod +x {}

