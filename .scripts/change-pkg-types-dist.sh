#!/bin/bash
# --------------
# Should call under sub-package
# --------------

currDir=`pwd`
pkgFile="$currDir/package.json"

echo -e "$pkgFile types will be dist/index.d.ts"

sed -i "s#\(\"types\":\).\+#\1 \"./dist/index.d.ts\",#g" "$pkgFile"

