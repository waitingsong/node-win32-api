import { readdirSync } from 'fs'

import { run, RxSpawnOpts } from 'rxrunscript'
import { Observable, of, firstValueFrom } from 'rxjs'
import { tap, mergeMap, mapTo, defaultIfEmpty } from 'rxjs/operators'

import {
  commonList,
  detailList,
  skipPkgList,
  fileNameToCopyList,
} from './doc-list'
import { join, statAsync, isPathAccessible, copyFileAsync } from './init-utils'


const baseDir = join(__dirname, '..')
const pkgEntryName = 'packages'
const pkgDir = join(baseDir, pkgEntryName)

const rootPkgJson = require(join(baseDir, 'package.json'))
const projectName = rootPkgJson.name

if (!projectName) {
  console.error('Name empty in file package.json')
  process.exit(1)
}


copyRootFilesToMainPkg(projectName)
  .then(async (paths) => {
    const cpFiles = await firstValueFrom(commitFiles(paths))
    if (cpFiles && cpFiles.length) {
      console.log('Sync Files: ' + cpFiles.join(' '))
    }

    return retrievePkgs()
  })
  .then(prefixArr => {
    return genFromCommon(prefixArr, commonList)
  })
  .then(async (data) => {
    const list = await genFromDetail(detailList)
    if (data.length > 0 || list.length > 0) {
      const arr = [...list, ...data]
      return arr
    }
    return []
  })
  .then(async (srcArr) => {
    if (srcArr.length) {
      const sh = `typedoc --options typedoc.json --name ${projectName} --readme README.md`
      const ps: RxSpawnOpts = {
        msgPrefixOpts: {
          stderrPrefix: 'stderr:',
          errPrefix: 'error:'
        },
        stderrMaxBufferSize: 2000,
        cwd: baseDir,
      }

      await firstValueFrom(run(sh, srcArr, ps)
        .pipe(
          tap(buf => {
            console.log(buf.toString())
          }),
        ))
    }
    else {
      process.exit(0)
    }
  })
  .catch(err => {
    console.log(err.message)
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


/**
 * Copy Readme.md from root to the main package folder,
 * @returns - files path
 */
async function copyRootFilesToMainPkg(dstName: string): Promise<string[]> {
  const paths: string[] = []

  for (const name of fileNameToCopyList) {
    const srcPath = join(baseDir, name)
    const dstPath = join(pkgDir, dstName, name)

    try {
      await copyFileAsync(srcPath, dstPath)
      paths.push(dstPath)
    }
    catch (ex) {
      console.log(ex.message)
    }
  }

  return paths
}

function commitFiles(paths: string[]): Observable<string[]> {
  if (! paths.length) {
    return of([])
  }

  const sh = `git diff --name-only`
  const ps: RxSpawnOpts = {
    msgPrefixOpts: {
      stderrPrefix: 'stderr:',
      errPrefix: 'error:'
    },
    stderrMaxBufferSize: 2000,
    cwd: baseDir,
  }

  const files$ = run(sh, paths, ps)
    .pipe(
      mergeMap(buf => {
        const str = buf.toString().trim()
        if (str.length) {
          const files = str.split(/\n|(\r\n)|\r/).filter(val => val && val.trim().length > 0)
          // console.log('changed file:', files)
          const add = 'git add'
          return run(add, files).pipe(
            mapTo(files)
          )
        }
        return []
      }),
      mergeMap(files => {
        if (files.length) {
          const cm = 'git commit -m "docs: sync readme document" -- '
          return run(cm, files).pipe(
            mapTo(files)
          )
        }
        return []
      }),
      defaultIfEmpty([] as string[])
    )

    return files$
}
