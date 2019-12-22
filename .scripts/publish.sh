#!/bin/bash

source `dirname $0`/build.sh
set -e
git add .
lerna publish $*
set +e

