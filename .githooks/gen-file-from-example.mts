#!/usr/bin/env tsx
/**
 * 搜索指定目录以 file.example 文件为基础生成不带后缀的文件为不带 .example 后缀的文件
 */
import { dirname, join, sep } from 'node:path'
import { cp, mkdir, readdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

import { folderArr, globalConfigFileArr } from './init.config.js'
import { genFileFromExample } from './init-example-file.js'


const currentURL = import.meta.url
const currentPath = fileURLToPath(currentURL)
const currentDir = dirname(currentPath)
const currentFileName = currentPath.split(sep).pop()
const rootDir = join(currentDir, '..')
console.log({ rootDir, currentFileName })

const pkgEntryName = 'packages'
const pkgBase = join(rootDir, pkgEntryName)

const files = await cpGlobalConfigsToPkgs(rootDir, globalConfigFileArr, pkgBase)
console.log('Sync config:', files)

const files2 = await genFileFromExample(rootDir, folderArr)
console.info(`生成基础文件：${rootDir}`, files2)

const dirs = await   readdir(pkgBase)
const arr: string[] = []

for (const name of dirs) {
  const pkgPath = join(pkgBase, name)
  const files3 = await genFileFromExample(pkgPath, folderArr)
  files3.forEach(file => arr.push(`${pkgEntryName}/${name}/${file}`))
  console.info(`生成包文件：`, arr)
}


// ---------------------------------------------

async function cpGlobalConfigsToPkgs(
  baseDir: string,
  configPaths: string[],
  pkgBase: string,
): Promise<string[]> {

  const pkgs = await readdir(pkgBase)
  const ret: string[] = []

  for (const pkg of pkgs) {
    for (const path of configPaths) {
      try {
        const dst = `${pkg}/${path}`
        const dstDir = dirname(join(pkgBase, dst))
        await mkdir(dstDir, { recursive: true })
        await cp(
          join(baseDir, path),
          join(pkgBase, dst),
        )
        ret.push(dst)
      }
      catch (ex: any) {
        console.log(ex.message)
      }
    }
  }

  return ret
}

/**
 * Generate random integer
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
export function genRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max))
}
