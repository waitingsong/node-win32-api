#!/bin/bash


if [ -z "$1" ]; then
  echo -e "\"$0\" needs parameter of remote branch name!"
  exit 1
fi

localHead=$(git rev-parse HEAD)
oriHead=$(git ls-remote origin --tags "$1" | awk '{print $1;}')

if [ "$localHead" != "$oriHead" ]; then
  echo -e " \n\n--------------------- CAUTION  -----------------------"
  echo -e "       >> Local HEAD and origin/$1 differ << "
  echo -e "local SHA:  $localHead"
  echo -e "remote SHA: $oriHead \n"
  return 1
fi

return 0
