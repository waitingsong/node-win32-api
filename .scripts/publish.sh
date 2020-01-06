#!/bin/bash

if [ -z $RELEASE_BRANCH ]; then
  branch=master
else
  branch="$RELEASE_BRANCH"
fi

source `dirname $0`/build.sh

source `dirname $0`/validate-head-diff.sh "$branch"
if [ "$?" -ne 0 ]; then
  echo -e "Release branch \"$branch\" has changed!"
  echo -e "Retry publishing on the latest pipeline"
  echo -e "script: $0 "
  echo -e "------------------------------------------------------\n"
  exit 1
fi

set -e
git add --ignore-errors .
# git push after npm publish and npm pkg contains package-lock.json
lerna publish --no-push $*
sleep "3s"
git push --follow-tags origin
set +e

