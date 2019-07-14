import {
  access,
  copyFile,
  readdir,
  readFile,
  stat,
} from 'fs'
import {
  basename,
  dirname,
  join,
  normalize,
} from 'path'
import {
  defer,
  Observable,
} from 'rxjs'
import {
  map,
} from 'rxjs/operators'
import { promisify } from 'util'


export const copyFileAsync = promisify(copyFile)
export const readFileAsync = promisify(readFile)
export const readDirAsync = promisify(readdir)
export const statAsync = promisify(stat)
export {
  basename,
  dirname,
  join,
  normalize,
}

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


/**
 * Generate random integer
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
export function genRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max))
}
