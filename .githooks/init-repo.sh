#!/bin/sh
#
# 初始化 git 仓库
#
# Author: waiting
# Date: 2019.01.21
#

git config --local push.followTags true \
  && git config --local core.hooksPath ./.githooks \
  && git config --local fetch.prune true \
  && git config --local push.recurseSubmodules check \
  && git config --local remote.origin.prune true \
  && git config --local remote.origin.tagopt --tags \
  && git config --local remote.pushdefault origin \
  && git config --local submodule.fetchJobs 2 \
  && git config --local submodule.recurse true \
  && git submodule update --init --recursive \
  && echo It may going for a long time. Plese wait... \
  && npm i --loglevel=info \
  && npm run link_global \
  && cd .githooks && tsc \
  && node gen-file-from-example.js

