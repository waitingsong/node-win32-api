#!/bin/bash
# --------------
# npm publish and trigger pack pipeline
# may called by ci-publish.sh or by hand
#
# Used CI Variables:
# - GH_TOKEN (optinal for creating release to github)
# - GL_TOKEN (optinal for creating release to gitlab)
# - NPM_REGISTRY for pull
# - NPM_VERSION_REGISTRY for npm publish, equal to version.registry of lerna.json (if exists)
# --------------

appDir=`pwd`
scriptDir="$appDir/.scripts"

tagVerCur=$(jq -r '.version' $appDir/lerna.json)
if [ -z "$tagVerCur" ]; then
  echo -e "Retrieve version of lerna.json failed!"
  exit 1
fi
pkgsChanged="$( lerna changed )"
if [ -z "$pkgsChanged" ]; then
  echo -e "No changed packages to publish"
  echo -e "Version from lerna.json: $tagVerCur"
  exit 0
fi

if [[ "$*" =~ "github" && -z $GH_TOKEN ]]; then
  echo -e "Invalid GH_TOKEN for lerna publish args '--create-release github'"
  echo -e "see: https://github.com/lerna/lerna/tree/master/commands/version#--create-release-type"
  exit 1
fi
if [[ "$*" =~ "gitlab" ]]; then
  if [ -z $GL_TOKEN ]; then
    echo -e "Invalid GL_TOKEN for lerna publish args '--create-release gitlab'"
    echo -e "see: https://github.com/lerna/lerna/tree/master/commands/version#--create-release-type"
    exit 1
  fi
  if [ -z $GL_API_URL ]; then
    export GL_API_URL="$CI_API_V4_URL"
    echo -e "GL_API_URL: $GL_API_URL"
  fi
  if [ -z $GL_API_URL ]; then
    echo -e "Invalid GL_API_URL  for lerna publish args '--create-release gitlab'"
    echo -e "see: https://github.com/lerna/lerna/tree/master/commands/version#--create-release-type"
    exit 1
  fi
fi

if [ -z $RELEASE_BRANCH ]; then
  branch=main
else
  branch="$RELEASE_BRANCH"
fi


source $scriptDir/util/validate-head-diff.sh "$branch"
if [ "$?" -ne 0 ]; then
  echo -e "Release branch \"$branch\" has changed!"
  echo -e "Retry publishing on the latest pipeline"
  echo -e "script: $0 "
  echo -e "------------------------------------------------------"
  exit 1
fi


# echo ">>> lerna initializing..."
# npm run bootstrap
# npm run build

rm -rf $appDir/package-lock.json
rm -rf $appDir/packages/*/package-lock.json

echo ">>> lerna pre-publish-valiate"
"$scriptDir/pre-publish-valiate.sh"

echo $*
echo ">>> lerna publishing..."
git status
if [ -z "$NPM_VERSION_REGISTRY" ]; then
  lerna publish $*
else
  lerna publish --registry "$NPM_VERSION_REGISTRY" $*
fi
sleep "5s"
git push --follow-tags origin


set -e

