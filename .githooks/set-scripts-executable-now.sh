#!/bin/bash
set +e

dirs=".scripts .github src bin"

for dir in $dirs; do
  [[ -d "$dir" ]] && find $dir -type f \( -iname "*.sh" -o -iname "*.mjs" -o -iname "*.mts" \) -print0 | xargs -0II chmod a+x I
done

set -e

