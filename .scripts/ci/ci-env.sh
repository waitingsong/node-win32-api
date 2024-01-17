#!/bin/bash
set -e


export LANG="en_US.UTF-8"
#export LANGUAGE="en_US.UTF-8"
#export LC_ALL="en_US.UTF-8"

export TIMEZ=Asia/Chongqing
export PGTZ=$TIMEZ
export MOCK_HOME_DIR=~/


# android
export GRADLE_USER_HOME=.gradle-bin


# flutter
export PUB_CACHE="$CI_PROJECT_DIR/.pub-cache"

# nodejs
export NODE_OPTIONS="$NODE_OPTIONS --no-warnings"


