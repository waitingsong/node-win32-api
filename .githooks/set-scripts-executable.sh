#!/bin/bash
set +e

find .scripts -type f -iname "*.sh" -print0 \
  | xargs -0i git update-index --ignore-missing --chmod=+x  {}

find .scripts -type f -iname "*.mjs" -print0 \
  | xargs -0i git update-index --ignore-missing --chmod=+x  {}

find .github -type f -iname "*.sh" -print0 \
  | xargs -0i git update-index --ignore-missing --chmod=+x  {}

find .github -type f -iname "*.mjs" -print0 \
  | xargs -0i git update-index --ignore-missing --chmod=+x  {}

find .githooks -type f -iname "*.sh" -print0 \
  | xargs -0i git update-index --ignore-missing --chmod=+x  {}

echo "Commit changes if changed!"

set -e

