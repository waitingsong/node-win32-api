#!/bin/bash
. .scripts/env.sh

# npm pkg name, not dir name
input="$@"
scope=''

if [ -z "$input" ]; then
  lerna run build:prod
else
  for mod in $input
  do
    scope="$scope --scope $mod"
  done
  lerna run build:prod $scope
fi

