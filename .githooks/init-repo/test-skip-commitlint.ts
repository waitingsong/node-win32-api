import { combineLatest, forkJoin, from as ofrom, of, Observable } from 'rxjs'
import { defaultIfEmpty, filter, map, mapTo, mergeMap, share, take, tap } from 'rxjs/operators'

import { join, pathAccessible, readFileAsync } from './init-utils'


// const baseDir = join(__dirname, '..')
// const args = process.argv
// const COMMIT_EDITMSG = args[2]
// const BRANCH = args[3]

export interface IsNeedCommitlintOpts {
  /** app root dir */
  baseDir: string
  /** common .git/COMMIT_EDITMSG */
  COMMIT_EDITMSG: string
  /** Current git branch name */
  branchName: string
  /** Regexp.test(git branch name) to doing commitlint */
  protectBranch: RegExp[]
  /** Regexp.test(commit msg) to skipping commitlint */
  skipMsg: RegExp[]
}

/** Return Observable<number> to check whether skip commitlint */
export function isSkipCommitlint(options: IsNeedCommitlintOpts): Observable<number> {
  const { baseDir, COMMIT_EDITMSG, branchName, protectBranch, skipMsg } = options

  const commitFile = join(baseDir, COMMIT_EDITMSG)

  if (!COMMIT_EDITMSG) {
    console.info('COMMIT_EDITMSG value blank')
    return of(1)
  }

  const protectRule$ = ofrom(protectBranch).pipe(defaultIfEmpty())
  const skipRule$ = ofrom(skipMsg).pipe(defaultIfEmpty())

  const content$ = pathAccessible(commitFile).pipe(
    tap(path => {
      if (!path) {
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

  const protectTest$ = combineLatest(of(branchName), protectRule$).pipe(
    map(([branch, regex]) => regex && regex.test(branch) ? true : false),
    filter(matched => matched),
    mapTo(0), // process.exit(0)
    defaultIfEmpty(1),  // not skip commitlint
  )
  const skipTest$ = combineLatest(content$, skipRule$).pipe(
    map(([{ head }, regex]) => regex && regex.test(head) ? true : false),
    filter(matched => matched),
    mapTo(1), // process.exit(1)
    defaultIfEmpty(0),  // not skip commitlint
  )

  const exitCode$ = forkJoin(protectTest$, skipTest$).pipe(
    map(([pro, skip]) => {
      // console.info('pro:skip', pro, skip)
      // tslint:disable-next-line:no-bitwise
      return pro & skip
    }),
    defaultIfEmpty(0),  // not skip commitlint
    take(1),
  )

  return exitCode$
}
