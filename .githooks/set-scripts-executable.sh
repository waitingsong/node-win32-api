#!/bin/bash
set +e

find .scripts -type f -iname "*.sh" -print0 \
  | xargs -0II git update-index --ignore-missing --chmod=+x I

find .scripts -type f -iname "*.mjs" -print0 \
  | xargs -0II git update-index --ignore-missing --chmod=+x I

find .github -type f -iname "*.sh" -print0 \
  | xargs -0II git update-index --ignore-missing --chmod=+x I

find .github -type f -iname "*.mjs" -print0 \
  | xargs -0II git update-index --ignore-missing --chmod=+x I

find .githooks -type f -iname "*.sh" -print0 \
  | xargs -0II git update-index --ignore-missing --chmod=+x I

echo "Commit changes if changed!"

set -e

