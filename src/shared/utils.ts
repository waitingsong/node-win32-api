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
import {
  defer,
  from as ofrom,
  of,
  Observable,
} from 'rxjs'
import {
  concatMap,
  last,
  map,
  mapTo,
  mergeMap,
  scan,
} from 'rxjs/operators'
import { promisify } from 'util'


export const closeAsync = promisify(close)
export const chmodAsync = promisify(chmod)
export const copyFileAsync = promisify(copyFile)
export const mkdirAsync = promisify(mkdir)
export const openAsync = promisify(open)
export const readFileAsync = promisify(readFile)
export const readDirAsync = promisify(readdir)
export const rmdirAsync = promisify(rmdir)
export const statAsync = promisify(stat)
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

/** Return path if accessible, blank if not accessible */
export function pathAccessible(path: string): Observable<string> {
  return defer(() => isPathAccessible(path)).pipe(
    map(exists => exists ? normalize(path) : ''),
  )
}
// support relative file ('./foo')
export function isPathAccessible(path: string): Promise<boolean> {
  return path
    ? new Promise(resolve => access(path, err => resolve(err ? false : true)))
    : Promise.resolve(false)
}

/** Check folder path exists, return path if exists, blank if not exists */
export function dirExists(path: string): Observable<string> {
  if (! path) {
    return of('')
  }
  const dir = normalize(path)
  return defer(() => isDirExists(dir)).pipe(
    map(exists => exists ? dir : ''),
  )
}
export function isDirExists(path: string): Promise<boolean> {
  return path ? isDirFileExists(path, 'DIR') : Promise.resolve(false)
}


/** Check file exists, return path if exists, blank if not exists */
export function fileExists(path: string): Observable<string> {
  const file = normalize(path)
  return defer(() => isFileExists(file)).pipe(
    map(exists => exists ? file : ''),
  )
}
export function isFileExists(path: string): Promise<boolean> {
  return path ? isDirFileExists(path, 'FILE') : Promise.resolve(false)
}


function isDirFileExists(path: string, type: 'DIR' | 'FILE'): Promise<boolean> {
  if (! path) {
    return Promise.resolve(false)
  }
  else {
    return isPathAccessible(path)
      .then(accessible => {
        return ! accessible
          ? false
          : statAsync(path).then(stats => {
            return type === 'DIR' ? stats.isDirectory() : stats.isFile()
          })
      })
  }
}

export function createDir(absolutePath: string): Observable<string> {
  /* istanbul ignore else */
  if (! absolutePath) {
    throw new Error('value of path param invalid')
  }
  // ! normalize required for '.../.myca' under win32
  const path$ = of(normalize(absolutePath))
  const paths$ = path$.pipe(
    mergeMap(target => ofrom(target.split(sep))),
    scan((acc: string, curr: string) => pathResolve(acc, curr), sep),
  )
  const create$ = paths$.pipe(
    concatMap(_createDirObb),
    last(),
  )

  const ret$ = path$.pipe(
    mergeMap(dirExists),
    mergeMap(p => p ? of(p) : create$),
  )

  return ret$
}
function _createDirObb(path: string, index?: number): Observable<string> {
  return pathAccessible(path).pipe(
    mergeMap(str => {
      return str
        ? of(str)
        : defer(() => mkdirAsync(path, 0o755)).pipe(mapTo(path))
    }),
  )
}

/** create directories recursively */
export async function createDirAsync(path: string): Promise<string> {
  if (! path) {
    throw new Error('value of path param invalid')
  }
  else {
    const target = normalize(path)  // ! required for '.../.myca' under win32
    /* istanbul ignore else */
    if (!await isDirExists(target)) {
      await target.split(sep).reduce(
        async (parentDir: Promise<string>, childDir: string) => {
          const curDir = pathResolve(await parentDir, childDir)

          await isPathAccessible(curDir) || await mkdirAsync(curDir, 0o755)
          return curDir
        },
        Promise.resolve(sep),
      )
    }

    return target
  }
}


/**
 * Create file
 * Buffer will be written as binary
 * Object will be written as JSON string
 *
 * @requires string - created file path
 */
export async function createFileAsync(file: string, data: any, options?: WriteFileOptions): Promise<string> {
  const dir = dirname(file)

  /* istanbul ignore next */
  if (! dir) {
    throw new Error('folder empty')
  }
  if (! await isDirExists(dir)) {
    await createDirAsync(dir)
  }
  const path = normalize(file)

  /* istanbul ignore else */
  if (!await isFileExists(path)) {
    const opts: WriteFileOptions = options ? options : { mode: 0o640 }

    if (Buffer.isBuffer(data)) {
      await writeFileAsync(path, data, opts)
    }
    else if (typeof data === 'object') {
      await writeFileAsync(path, JSON.stringify(data))
    }
    else {
      await writeFileAsync(path, data, opts)
    }
  }

  return path
}


/**
 * @deprecated in favor of using child_process['ExecOptions']
 */
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


/* istanbul ignore next */
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
/* istanbul ignore next */
async function _rimraf(path: string): Promise<void> {
  if (! path) {
    return
  }

  if (await isPathAccessible(path)) {
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

