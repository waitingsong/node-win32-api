#!/bin/bash
# ---------------------------
# Add sub-package from packages/mw-demo
#
# ---------------------------

cwd=`pwd`
PKGS="$cwd/packages"
tplDir="$PKGS/mw-demo"
tplName="@mwcp/demo"

pkgName="$1"

if [ -z "$pkgName" ]; then
  echo -e "Missing package name!"
  echo -e "Command examples: "
  echo -e "  - 'npm run add:mwcp bar' without scope @mwcp"
  echo -e "\n"
  exit 1
fi

pkgScope="@mwcp"
pkgScopeWoAt="mwcp"
pkgFullName="${pkgScope}/${pkgName}"

if [ -z "$pkgName" ]; then
  echo -e "pkgName empty!"
  echo -e "Input: \"$pkgFullName\""
  echo -e "\n"
  exit 1
fi
pkgFullDir="${pkgScopeWoAt}-${pkgName}"

echo -e "-------------------------------------------"
echo -e " Initialize package from tpl $tplName"
echo -e " Name: $pkgFullName "
echo -e " Folder: $pkgFullDir "
echo -e "-------------------------------------------"


# pkgPath="${PKGS}/${pkgName}"
pkgPath="${PKGS}/${pkgFullDir}"

if [ -d "$pkgPath" ]; then
  echo -e "pkg path EXITS!"
  echo -e "path: \"$pkgPath\""
  echo -e "\n"
  exit 1
fi

mkdir -p "$pkgPath" "$pkgPath/src"

fReadme="README.md"
f1="package.json"
f2="tsconfig.json"
f4=".editorconfig"
f8="LICENSE"


f03="bootstrap.js"

echo -e "Copying files to folder: $pkgPath/ ..."
cp "$tplDir/$f1" "$pkgPath/"
cp "$tplDir/$f2" "$pkgPath/"
cp "$tplDir/$f4" "$pkgPath/"

cp "$tplDir/$f03" "$pkgPath/"
echo "" >> "$pkgPath/$fReadme"

cp -a "$tplDir/src" "$pkgPath/"

pkgJson="$pkgPath/package.json"
echo -e "Updating file: $pkgJson"

sed -i "s#$tplName#${pkgFullName}#g" "$pkgJson"
sed -i "s#\(private.\+\)true#\1false#g" "$pkgJson"
repo=$(git remote get-url origin)
if [ -n "$repo" ]; then
  sed -i "s#\(git+https://\)#${repo}#" "$pkgJson"
fi

testDir="$pkgPath/test"
mkdir -p "$testDir"
cp -a "$tplDir/test/" "$pkgPath/"
rm -rf "$testDir/fixtures/base-app/logs"

echo -e "Git add files..."
git add -f -- "$pkgPath"

git commit -nm "chore: initialize package $pkgFullName"
echo -e "Git add success\n"


rm -rf .nx
npm i --disturl=https://npmmirror.com/dist/
npm run build "$pkgFullName"

echo -e "\nInitialization success. You should git add files under src/ manually!"

echo -e "Packages list:"
lerna list

