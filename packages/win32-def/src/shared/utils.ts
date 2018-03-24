import {
  access,
  chmod,
  close,
  copyFile,
  mkdir,
  open,
  readdir,
  readFile,
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
export const unlinkAsync = promisify(unlink)
export const writeAsync = promisify(write)
export const writeFileAsync = promisify(writeFile)
export {
  basename,
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
      stat(path, (err, stats) => (
        err ? resolve(false) : resolve(type === 'DIR' ? stats.isDirectory() : stats.isFile())
      ))
    })
    : Promise.resolve(false)
}


// create directories recursively
export async function createDir(path: string): Promise<void> {
  if (! path) {
    throw new Error('value of path param invalid')
  }
  else {
    path = normalize(path)
    if (!await isDirExists(path)) {
      await path.split(sep).reduce(
        async (parentDir, childDir) => {
          const curDir = pathResolve(await parentDir, childDir)

          await isPathAcessible(curDir) || await mkdirAsync(curDir, 0o755)
          return curDir
        },
        Promise.resolve(sep)
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

  /* istanbul ignore else */
  if (!await isFileExists(file)) {
    if (typeof data === 'object') {
      await writeFileAsync(file, JSON.stringify(data))
    }
    else {
      const opts: WriteFileOptions = options ? options : { mode: 0o640 }

      await writeFileAsync(file, data, opts)
    }
  }
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
