#!/usr/bin/env zx
import assert from 'node:assert'
import { join, basename } from 'node:path'
import { stat, copyFile } from 'node:fs/promises'


const pkgDir = argv.p ?? ''
const httpPath = argv.api ?? ''
const qps = argv.qps
const sleepTime = argv.wait ?? 25000

assert(pkgDir, 'pkg dir is required with -p')

const dir = join('./packages', pkgDir)
try {
  const dirStat = await stat(dir)
  if (!dirStat.isDirectory()) {
    throw new Error(`"${dir}" is not a directory`)
  }
}
catch {
  throw new Error(`Path is not exists: ${dir}`)
}

const tplDir = `./${pkgDir}`
console.log({ tplDir })

const files = [
  ['start-for-perf.mjs'],
  ['benchmark.mjs'],
  // [`${tplDir}/configuration.ts`, `src/configuration.ts`],
]
for (const [file, dst] of files) {
  const filePath = join(__dirname, file)
  try {
    const fileStat = await stat(filePath)
    if (! fileStat.isFile()) {
      console.warn(`"${filePath}" is not a file`)
      continue
    }
    const dstPath = dst ? `${dir}/${dst}` : `${dir}/${basename(file)}`
    await copyFile(filePath, dstPath)
  }
  catch (ex) {
    console.warn(ex)
  }
}

echo`[benchmark] script complete`

cd(dir)

await $`pwd && npm run build`
echo(chalk.blue('[benchmark] build example complete'))

let gotError = false
try {
  echo(chalk.blue('\n[benchmark] start'))
  await $`zx benchmark.mjs --api=${httpPath} --qps=${qps} --wait=${sleepTime}`
}
catch (ex) {
  console.error(ex)
  gotError = true
  throw ex
}
finally {
  const arr = []
  for (const [file, dst] of files) {
    const filePath = join(__dirname, file)
    try {
      const fileStat = await stat(filePath)
      if (!fileStat.isFile()) {
        continue
      }
      if (dst) {
        arr.push(dst)
      }
    }
    catch { void 0 }
  }

  if (arr.length > 0) {
    await $`git restore ${arr}`
  }

  if (gotError) {
    console.error(chalk.red('\n[benchmark] benchmark failed with error'))
    process.exit(1)
  }
  else {
    echo(chalk.green('\n[benchmark] finished'))
  }
}

