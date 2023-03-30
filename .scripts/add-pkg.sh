#!/bin/bash
# ---------------------------
# Add sub-package from packages/demo
#
# ---------------------------

cwd=`pwd`
PKGS="$cwd/packages"
tplDir="$PKGS/demo"
tplName="demo"

pkgFullName="$1"
pkgName="$1"

if [ -z "$pkgFullName" ]; then
  echo -e "Missing package name!"
  echo -e "Command examples: "
  echo -e "  - npm run add:pkg module "
  echo -e "  - npm run add:pkg @foo/module "
  echo -e "\n"
  exit 1
fi

pkgScope=""
if [ "${pkgFullName:0:1}" == "@" ]; then
  pkgScope=$(echo "$pkgFullName" | awk -F'/' '{print $1}')
  pkgName=$(echo "$pkgFullName" | awk -F'/' '{print $2}')
fi

if [ -z "$pkgName" ]; then
  echo -e "pkgName empty!"
  echo -e "Input: \"$pkgFullName\""
  echo -e "\n"
  exit 1
fi

echo -e "-------------------------------------------"
echo -e " Initialize package from tpl $demo"
echo -e " Name: $pkgFullName "
echo -e "-------------------------------------------"


pkgPath="${PKGS}/${pkgName}"

if [ -d "$pkgPath" ]; then
  echo -e "pkg path EXITS!"
  echo -e "path: \"$pkgPath\""
  echo -e "\n"
  exit 1
fi

mkdir -p "$pkgPath"

f1="package.json"
f2="tsconfig.json"
f3="tsconfig.eslint.json"
f4=".editorconfig"
f8="LICENSE"
f9="rollup.config.js"
f10="tsconfig.cjs.json"

echo -e "Copying files to folder: $pkgPath/ ..."
cp "$tplDir/$f1" "$pkgPath/"
cp "$tplDir/$f2" "$pkgPath/"
cp "$tplDir/$f3" "$pkgPath/"
cp "$tplDir/$f4" "$pkgPath/"
cp "$tplDir/$f8" "$pkgPath/"
cp "$tplDir/$f9" "$pkgPath/"
cp "$tplDir/$f10" "$pkgPath/"

pkgJson="$pkgPath/package.json"
echo -e "Updating file: $pkgJson"


sed -i "s#$tplName#${pkgFullName}#g" "$pkgJson"
sed -i "s#\(private.\+\)true#\1false#g" "$pkgJson"
repo=$(git remote get-url origin)
if [ -n "$repo" ]; then
  sed -i "s#\(git+https://.*\)#${repo}\"#" "$pkgJson"
fi

testDir="$pkgPath/test"
mkdir -p "$testDir"
t1="tsconfig.json"
t2="0.dummy.test.ts"
t3=".eslintrc.yml"
t4="root.hooks.ts"
cp "$tplDir/test/$t1" "$testDir/"
cp "$tplDir/test/$t2" "$testDir/"
cp "$tplDir/test/$t3" "$testDir/"
cp "$tplDir/test/$t4" "$testDir/"

echo -e "Git add files..."
git add -f -- "$pkgPath"

git commit -nm "chore($pkgName): initialize package $pkgFullName"
echo -e "Git add success\n"


cp -a "$tplDir/src" "$pkgPath/"
echo -e "Copying folder src/ done, You should git add files manually!"

npm run bootstrap
npm run build "$pkgFullName"

echo -e "\nInitialization success. You should git add files under src/ manually!"

echo -e "Packages list:"
lerna list

