/**
 * 搜索指定目录以 file.example 文件为基础生成不带后缀的文件为不带 .example 后缀的文件
 */
import { folderArr, globalConfigFileArr } from './init.config'
import { genFileFromExample } from './init-example-file'
import { join, readDirAsync, cpGlobalConfigsToPkgs } from './init-utils'


const pkgEntryName = 'packages'
const rootDir = join(__dirname, '..')
const pkgBase = join(rootDir, pkgEntryName)

cpGlobalConfigsToPkgs(rootDir, globalConfigFileArr, pkgBase)
  .then(files => {
    console.log('Sync config:', files)

    return genFileFromExample(rootDir, folderArr)
      .then(files => {
        console.info(`生成基础文件：${rootDir}`, files)
      })
  })
  .then(() => {
    return readDirAsync(pkgBase)
      .then(async (dirs) => {
        const arr: string[] = []

        for (const name of dirs) {
          const pkgPath = join(pkgBase, name)
          await genFileFromExample(pkgPath, folderArr)
            .then(files => {
              files.forEach(file => arr.push(`${pkgEntryName}/${name}/${file}`))
            })
        }
        console.info(`生成包文件：`, arr)
      })
  })
  .catch(console.error)

