#!/bin/sh
# ---------------------------
# 初始化 git 项目
# 执行完毕后自动删除本文件
#
# Author: waiting
# Date: 2021.03.06
# ---------------------------

cwd=`pwd`
PKGS="$cwd/packages"
tplProjectName="NPM mono repository"

sh "$cwd/.scripts/util/check-env.sh"

parentPath=$(builtin cd "$cwd"; pwd)
pdName=$(echo "$parentPath" | awk -F'/' '{print $NF}')

projectFullName="$1"
projectName="$1"

if [ -z "$projectFullName" ]; then
  # echo -e "Missing project name!"
  # echo -e "Command examples: "
  # echo -e "  - npm run $0 my_project "
  # echo -e "  - npm run $0 @foo/my_project "
  # echo -e "\n"
  # exit 1
  projectFullName="$pdName"
  projectName="$pdName"
fi

projectScope=""
if [ "${projectFullName:0:1}" == "@" ]; then
  projectScope=$(echo "$projectFullName" | awk -F'/' '{print $1}')
  projectName=$(echo "$projectFullName" | awk -F'/' '{print $2}')
fi

if [ -z "$projectName" ]; then
  echo -e "projectName empty!"
  echo -e "Input: \"$projectFullName\""
  echo -e "\n"
  exit 1
fi

echo -e "-------------------------------------------"
echo -e "   Initialize project "
echo -e "   Name: $projectFullName "
echo -e "-------------------------------------------"

git config --local i18n.commitencoding utf-8 \
  && git config --local push.followTags true \
  && git config --local core.hooksPath ./.githooks \
  && git config --local fetch.prune true \
  && git config --local remote.origin.prune true \
  && git config --local remote.origin.tagopt --tags \
  && git config --local remote.pushdefault origin

sed -i '/^## 创建新项目/,+50 d' README.md

if [ -n "$projectScope" ]; then
  sed -i "s#\(NPM scope: \`\)@scope#\1$projectScope#" README.md
else
  sed -i "s#\(NPM scope: \`\)@scope#\1n/a#" README.md
fi

currProjectName=$(jq -r '.name' package.json)
if [[  "$currProjectName" != "$projectFullName" ]]; then
  git add package.json
  git commit -nm "chore: update project name"

  sed -i "s#\(\"name\":\).\+#\1 \"${projectFullName}\",#" README.md
  sed -i "s#$tplProjectName#$projectFullName repository#" README.md
fi

git add README.md
git commit -nm "docs: clean and update README"

sed -i 's#\(lerna run build\)#\1 --ignore demo#g' .scripts/build.sh
sed -i 's#\(lerna run lint\s\+\)#\1 --ignore demo#g' .scripts/lint.sh
sed -i 's#\(lerna run lint:\w\+\)#\1 --ignore demo#g' .scripts/lint-no-fix.sh
sed -i 's#\(lerna run lint:\w\+\)#\1 --ignore demo#g' .scripts/lint-no-fix-s.sh
sed -i 's#\(lerna run test\)#\1 --ignore demo#g' .scripts/test.sh
sed -i 's#\(lerna run cov\)#\1 --ignore demo#g' .scripts/cov.sh

git add -- \
  .scripts/build.sh \
  .scripts/lint.sh \
  .scripts/lint-no-fix.sh \
  .scripts/lint-no-fix-s.sh \
  .scripts/test.sh \
  .scripts/cov.sh \

git commit -nm "chore: initialize"

rm -- "$0" && git add "$0" && git commit -nm "chore: clean"

