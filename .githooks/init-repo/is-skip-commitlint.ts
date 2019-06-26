/**
 * 通过设置执行结果 code， 检查是否需要执行 commitlint
 */

import { tap } from 'rxjs/operators'

import { join } from './init-utils'
import { protectBranch, skipMsg } from './is-skip-commitlint-rule'
import { isSkipCommitlint } from './test-skip-commitlint'


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
