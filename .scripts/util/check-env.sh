#!/bin/bash


type jq 1>/dev/null
if [ $? != 0 ]; then
  echo -e "jq not callable!"
  echo -e "Download: https://stedolan.github.io/jq/download/"
  echo -e "For win32: copy jq-win64.exe to %windir%/system32/jq.exe"
  exit 1
fi

type sed 1>/dev/null
if [ $? != 0 ]; then
  echo -e "sed not callable!"
  exit 1
fi

type awk 1>/dev/null
if [ $? != 0 ]; then
  echo -e "awk not callable!"
  exit 1
fi

