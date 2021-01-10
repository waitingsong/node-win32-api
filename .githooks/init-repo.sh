#!/bin/sh
#
# 初始化 git 仓库
#
# Author: waiting
# Date: 2019.01.21
#

git init \
  && git config --local i18n.commitencoding utf-8 \
  && git config --local push.followTags true \
  && git config --local core.hooksPath ./.githooks \
  && git config --local fetch.prune true \
  && git config --local remote.origin.prune true \
  && git config --local remote.origin.tagopt --tags \
  && git config --local remote.pushdefault origin \
  && echo It may going for a long time. Plese wait... \
  && npm run bootstrap \
  && cd .githooks && tsc \
  && node gen-file-from-example.js

