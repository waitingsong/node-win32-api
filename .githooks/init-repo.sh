#!/bin/bash
#
# 初始化 git 仓库
#
# Author: waiting
# Date: 2019.01.21
#
set -e

git init
git config --global i18n.commitencoding utf-8

if [ -z "$CI" ]; then
  git config --local core.autocrlf false
  git config --local core.eol lf
  git config --local core.hooksPath ./.githooks
  git config --local core.ignorecase false
  git config --local core.precomposeUnicode true
  git config --local fetch.prune true
  git config --local pull.rebase true
  git config --local push.followTags true
  git config --local rebase.autoStash true
  git config --local remote.origin.prune true
  git config --local remote.origin.tagopt --tags
  git config --local remote.pushdefault origin
fi;

if [ -z $CI ]; then
  echo It may going for a long time. Plese wait...
  cd .githooks && tsc && node gen-file-from-example.js && cd -
fi;

lerna list
