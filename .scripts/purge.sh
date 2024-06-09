#!/bin/bash
set +e


if [[ -d node_modules/nx ]]; then
  nx reset
fi

rm -rf .nx
rm -rf node_modules package-lock.json
npm i
npm run refresh

if [[ -d node_modules/nx ]]; then
  nx reset
fi

# rm -rf .nx
# workaround for lerna Error: LOCK-FILES-CHANGED
npm run build

