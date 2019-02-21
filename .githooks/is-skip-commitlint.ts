/**
 * 通过设置执行结果 code， 检查是否需要执行 commitlint
 */

import { isSkipCommitlint, join } from '@waiting/shared-core'
import { tap } from 'rxjs/operators'

import { protectBranch, skipMsg } from './is-skip-commitlint-rule'


const args = process.argv
const baseDir = join(__dirname, '..')

isSkipCommitlint({
  baseDir,
  branchName: args[3],
  COMMIT_EDITMSG: args[2],
  protectBranch,
  skipMsg,
}).pipe(
  tap(exitCode => {
    process.exit(exitCode)
  }),
).subscribe()
