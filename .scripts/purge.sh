#!/bin/bash


npm run clean
if [[ -d node_modules/nx ]]; then
  nx reset
fi
rm -rf node_modules package-lock.json
npm run refresh

