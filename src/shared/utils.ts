import {
  access,
  chmod,
  close,
  copyFile,
  mkdir,
  open,
  readdir,
  readFile,
  rmdir,
  stat,
  unlink,
  write,
  writeFile,
} from 'fs'
import {
  basename,
  dirname,
  join,
  normalize,
  resolve as pathResolve,
  sep,
} from 'path'
import { promisify } from 'util'


export const closeAsync = promisify(close)
export const chmodAsync = promisify(chmod)
export const copyFileAsync = promisify(copyFile)
export const mkdirAsync = promisify(mkdir)
export const openAsync = promisify(open)
export const readFileAsync = promisify(readFile)
export const readDirAsync = promisify(readdir)
export const rmdirAsync = promisify(rmdir)
export const unlinkAsync = promisify(unlink)
export const writeAsync = promisify(write)
export const writeFileAsync = promisify(writeFile)
export {
  basename,
  dirname,
  join,
  normalize,
  pathResolve,
  promisify,
}
export { tmpdir } from 'os'

// support relative file ('./foo')
export function isPathAcessible(path: string): Promise<boolean> {
  return path
    ? new Promise(resolve => access(path, err => resolve(err ? false : true)))
    : Promise.resolve(false)
}

export function isDirExists(path: string): Promise<boolean> {
  return path ? isDirFileExists(path, 'DIR') : Promise.resolve(false)
}


export function isFileExists(path: string): Promise<boolean> {
  return path ? isDirFileExists(path, 'FILE') : Promise.resolve(false)
}


function isDirFileExists(path: string, type: 'DIR' | 'FILE'): Promise<boolean> {
  return path
    ? new Promise(resolve => {
      stat(path, (err, stats) => {
        err || ! stats ? resolve(false) : resolve(type === 'DIR' ? stats.isDirectory() : stats.isFile())
      })
    })
    : Promise.resolve(false)
}


// create directories recursively
export async function createDir(path: string): Promise<void> {
  if (! path) {
    throw new Error('value of path param invalid')
  }
  else {
    path = normalize(path)  // ! required for '.../.myca' under win32
    /* istanbul ignore else */
    if (!await isDirExists(path)) {
      await path.split(sep).reduce(
        async (parentDir: Promise<string>, childDir: string) => {
          const curDir = pathResolve(await parentDir, childDir)

          await isPathAcessible(curDir) || await mkdirAsync(curDir, 0o755)
          return curDir
        },
        Promise.resolve(sep),
      )
    }
  }
}


export async function createFile(file: string, data: any, options?: WriteFileOptions): Promise<void> {
  const path = dirname(file)

  /* istanbul ignore next */
  if (! path) {
    throw new Error('path empty')
  }
  if (! await isDirExists(path)) {
    await createDir(path)
  }
  file = normalize(file)

  /* istanbul ignore else */
  if (!await isFileExists(file)) {
    const opts: WriteFileOptions = options ? options : { mode: 0o640 }

    if (typeof data === 'object') {
      await writeFileAsync(file, JSON.stringify(data))
    }
    else {
      await writeFileAsync(file, data, opts)
    }
  }
}

/* istanbul ignore next */
export function logger(...args: any[]) {
  // tslint:disable-next-line
  console.log(args)
}

export interface ExecFileOptions {
  cwd?: string
  env?: object
  encoding?: 'utf8' | string
  timeout?: 0 | number
  maxBuffer?: number
  killSignal?: string
  uid?: number
  gid?: number
  windowsHide?: boolean
  windowsVerbatimArguments?: boolean
}
// param options of fs.writeFile()
export interface WriteFileOptions {
  encoding?: string | null
  mode?: number
  flag?: string
}

export function assertNever(x: never): never {
  throw new Error('Assert Never Unexpected object: ' + x)
}

/**
 * Remove directory recursively
 * @see https://stackoverflow.com/a/42505874/3027390
 */
export async function rimraf(path: string): Promise<void> {
  if (! path) {
    return
  }
  await _rimraf(path)
  if (await isDirExists(path)) {
    await rmdirAsync(path)
  }
}
async function _rimraf(path: string): Promise<void> {
  if (! path) {
    return
  }

  if (await isPathAcessible(path)) {
    if (await isFileExists(path)) {
      await unlinkAsync(path)
      return
    }
    const entries = await readDirAsync(path)

    if (entries.length) {
      for (const entry of entries) {
        await _rimraf(join(path, entry))
      }
    }
    else {
      await rmdirAsync(path)
    }
  }
}
