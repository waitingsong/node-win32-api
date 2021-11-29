#!/bin/bash

input="$@"
scope=''

if [ -z "$input" ]; then
  lerna run test
else
  for pkg in $input
  do
    scope="$scope --scope $pkg"
  done

  lerna run test $scope
fi

