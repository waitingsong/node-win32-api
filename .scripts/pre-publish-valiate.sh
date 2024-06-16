#!/bin/bash
# --------------
# Should call under sub-package
# --------------
set -e

currDir=`pwd`
pkgFile="$currDir/package.json"

git restore .scripts
git add --ignore-errors ./packages
str=$( git status )
echo $str
sub="Changes to be committed"

if [[ "$str" == *"$sub"* ]]; then
  echo -e "\n"
  echo -e ">>>>> File changed, stop publish ! <<<<< \n"
  echo "$str"
  echo -e "\n"
  exit 1
fi

