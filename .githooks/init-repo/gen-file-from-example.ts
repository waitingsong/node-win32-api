/**
 * 搜索指定目录以 file.example 文件为基础生成不带后缀的文件为不带 .example 后缀的文件
 */

import { genFileFromExample } from './init-example-file'
import { join, readDirAsync } from './init-utils'
import folderArr from './init.config'


const pkgEntryName = 'packages'
const rootDir = join(__dirname, '..')
const pkgBase = join(rootDir, pkgEntryName)


readDirAsync(pkgBase)
  .then(async (dirs) => {
    const arr: string[] = []

    for (const name of dirs) {
      const pkgPath = join(pkgBase, name)
      await genFileFromExample(pkgPath, folderArr)
        .then(files => {
          files.forEach(file => arr.push(`${pkgEntryName}/${name}/${file}`))
        })
    }
    return arr
  })
  .then(files => {
    console.info('生成文件：', files)
  })
  .catch(console.error)
