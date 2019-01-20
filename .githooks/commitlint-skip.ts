/**
 * 搜索指定目录以 file.example 文件为基础生成不带后缀的文件为不带 .example 后缀的文件
 */

import { join, pathAccessible, readFileAsync } from '@waiting/shared-core'
import { combineLatest, concat, from as ofrom, of } from 'rxjs'
import { map, mergeMap, share, tap } from 'rxjs/operators'

import { protectBranch, skipMsg } from './commitlint-skip-rule'


const baseDir = join(__dirname, '..')
const args = process.argv
const COMMIT_EDITMSG = args[2]
const commitFile = join(baseDir, COMMIT_EDITMSG)
const BRANCH = args[3]


if (! COMMIT_EDITMSG) {
  console.info('COMMIT_EDITMSG value blank')
  process.exit(0)
}

const protectRule$ = ofrom(protectBranch)
const skipRule$ = ofrom(skipMsg)

const content$ = pathAccessible(commitFile).pipe(
  tap(path => {
    if (! path) {
      console.info(`COMMIT_EDITMSG file not exists: "${commitFile}"`)
      process.exit(1)
    }
  }),
  mergeMap(path => readFileAsync(path, { encoding: 'utf8' })),
  map(msg => {
    const head = msg.split(/\n|\r\n/)[0]
    return { head, msg }
  }),
  share(),
)

const protectTest$ = combineLatest(of(BRANCH), protectRule$).pipe(
  tap(([branch, regex]) => {
    if (regex.test(branch)) {
      process.exit(0)
    }
  }),
)
const skipTest$ = combineLatest(content$, skipRule$).pipe(
  tap(([{ head }, regex]) => {
    if (regex.test(head)) {
      process.exit(1)
    }
  }),
)

concat(protectTest$, skipTest$).subscribe()

