/**
 * 搜索指定目录以 file.example 文件为基础生成 去除结尾 .example
 */
import { join } from 'node:path'
import { cp, readdir, stat } from 'node:fs/promises'


export async function genFileFromExample(rootDir: string, list: string[]): Promise<string[]> {
  const copied: string[] = []

  for (const dir of list) {
    const srcPath = join(rootDir, dir.replace(/\.{2,}/, '/'))

    try {
      const pathStat = await stat(srcPath)
      if (! pathStat.isDirectory) { continue }
    }
    catch {
      continue
    }

    const files = await readdir(srcPath)

    for (const file of files) {
      if (! hasExampleSuffix(file)) {
        continue
      }
      const source = join(srcPath, file)
      const stripped = stripExampleSuffix(file)
      const target = join(srcPath, stripped)

      let targetStat
      try {
        targetStat = await stat(target)
      }
      catch {
        void 0
      }
      if (! targetStat) {
        await cp(source, target, { force: false })
        copied.push(`${dir}/${stripped}`)
      }
    }
  }

  return copied
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
