/**
 * 搜索指定目录以 file.example 文件为基础生成不带后缀的文件为不带 .example 后缀的文件
 */

import { copyFileAsync, isDirExists, isFileExists, join, readDirAsync } from '../src/shared/index'

import folderArr from './init.config'

const rootDir = join(__dirname, '..')
const copyed = <string[]> []

async function genExampleFiles(list: string[]) {
  for (const dir of list) {
    const path = join(rootDir, dir.replace(/\.{2,}/, '/'))

    if (! await isDirExists(path)) {
      continue
    }
    const files = await readDirAsync(path)

    for (const file of files) {
      if (!hasExampleSuffix(file)) {
        continue
      }
      const source = join(path, file)
      const stripped = stripExampleSuffix(file)
      const target = join(path, stripped)

      if (! await isFileExists(target)) {
        await copyFileAsync(source, target)
        copyed.push(`${dir}/${stripped}`)
      }
    }
  }
}

function hasExampleSuffix(name: string): boolean {
  if (!name) {
    return false
  }
  if (name === '.example') {
    return false
  }
  const arr = name.split('.')

  if (arr.length > 1 && arr[arr.length - 1] === 'example') {  // 排除  '.example'
    return true
  }
  else {
    return false
  }
}

function stripExampleSuffix(name: string): string {
  const arr = name.split('.')

  if (arr.length > 1 && arr[arr.length - 1] === 'example') {
    return arr.slice(0, arr.length - 1).join('.')
  }
  return name
}

genExampleFiles(folderArr)
  .then(() => {
    console.info('生成文件：', copyed)
  })
  .catch(console.error)
