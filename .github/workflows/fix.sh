#!/bin/bash

mkdir -p ~/.npm
chown -R 1001:121 ~/.npm

if [ -n "$cwd" ]; then
  chmod 777 -R "$cwd"
fi


