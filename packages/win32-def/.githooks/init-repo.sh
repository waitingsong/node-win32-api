#!/bin/sh
#
# 初始化 git 仓库
#
# Author: waiting
# Date: 2019.01.21
#

git config --local push.followTags true \
  && git config --local core.hooksPath ./.githooks \
  && git config --local remote.origin.prune true \
  && git config --local remote.origin.tagopt --tags \
  && git config --local remote.pushdefault origin \
  && echo It may going for a long time. Plese wait... \
  && npm i \
  && npm run link_global \
  && cd .githooks && tsc \
  && node gen-file-from-example.js

