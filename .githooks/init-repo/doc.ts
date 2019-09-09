import { join, statAsync, isPathAccessible } from './init-utils'
import { run, RxRunFnArgs, RxSpawnOpts, MsgPrefixOpts } from 'rxrunscript'

import { commonList, detailList, skipPkgList } from './doc-list'
import { readdirSync } from 'fs'
import { mapTo, tap } from 'rxjs/operators'

const baseDir = join(__dirname, '..')
const pkgEntryName = 'packages'
const pkgDir = join(baseDir, pkgEntryName)

const fileSet: Set<string> = new Set()

const rootPkgJson = require(join(baseDir, 'package.json'))
const projectName = rootPkgJson.name

if (!projectName) {
  console.error('Name empty in file package.json')
  process.exit(1)
}

retrievePkgs()
  .then(prefixArr => {
    return genFromCommon(prefixArr, commonList)
  })
  .then(async (data) => {
    const list = await genFromDetail(detailList)
    if (data.length > 0 || list.length > 0) {
      const arg = `${list.join(' ')} ${data.join(' ')}`
      return arg
    }
    return ''
  })
  .then(async (arg) => {
    if (arg) {
      const sh = `typedoc --options typedoc.json --name ${projectName} ${arg}`
      const ps: RxSpawnOpts = {
        msgPrefixOpts: {
          stderrPrefix: 'stderr:',
          errPrefix: 'error:'
        },
        stderrMaxBufferSize: 2000,
        cwd: baseDir,
      }

      await run(sh, [], ps)
        .pipe(
          tap(val => {
            console.log(val.toString())
          }),
        )
        .toPromise()
    }
    else {
      process.exit(0)
    }
  })

async function retrievePkgs(): Promise<string[]> {
  const ret: string[] = []
  const entries = readdirSync(pkgDir)

  for (const name of entries) {
    if (skipPkgList.includes(name)) {
      continue
    }
    const path = join(pkgDir, name)
    const stat = await statAsync(path)
    if (!stat.isDirectory()) {
      continue
    }

    const pkgJson = join(path, 'package.json')
    if (! await isPathAccessible(pkgJson)) {
      continue
    }
    ret.push(name)
  }

  return ret
}


/**
 * @returns format: packages/<pkgName>/...file
 */
async function genFromCommon(pkgNameArr: string[], files: string[]): Promise<string[]> {
  const ret: string[] = []

  for (const prefix of pkgNameArr) {
    for (const file of files) {
      const relativePath = `${pkgEntryName}/${prefix}/${file}`
      const path = join(baseDir, relativePath)

      if (! await isPathAccessible(path)) {
        console.log('bcz')
        continue
      }

      try {
        const stat = await statAsync(path)
        if (stat.isFile()) {
          ret.push(relativePath)
        }
      }
      catch (ex) {
        console.log(ex.message)
      }
    }
  }

  return ret
}


async function genFromDetail(files: string[]): Promise<string[]> {
  const ret: string[] = []

  for (const file of files) {
    const path = join(baseDir, file)
    if (! await isPathAccessible(path)) {
      console.log('bcz')
      continue
    }

    try {
      const stat = await statAsync(path)
      if (stat.isFile()) {
        ret.push(file)
      }
    }
    catch (ex) {
      console.log(ex.message)
    }
  }

  return ret

}

