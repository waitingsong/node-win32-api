#!/bin/bash
# --------------
# Should call under sub-package
# --------------

currDir=`pwd`
pkgFile="$currDir/package.json"

echo -e "$pkgFile types will be src/index.ts"

sed -i "s#\(\"types\":\).\+#\1 \"./src/index.ts\",#g" "$pkgFile"

