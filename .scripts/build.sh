#!/bin/bash
. .scripts/env.sh

input="$@"
scope=''

if [ -z "$input" ]; then
  lerna run build
else
  for pkg in $input
  do
    scope="$scope --scope $pkg"
  done

  lerna run build $scope
fi

