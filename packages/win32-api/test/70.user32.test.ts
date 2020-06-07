import { spawn, ChildProcess } from 'child_process'
import { basename } from 'path'

import * as ffi from 'ffi-napi'
import * as assert from 'power-assert'
import * as ref from 'ref-napi'
import { of } from 'rxjs'
import { delay, tap } from 'rxjs/operators'
import {
  DModel as M,
  DTypes as W,
} from 'win32-def'

import { user32 } from './helper'


const filename = basename(__filename)
const tmpMap = new Map<string, boolean>()
const title = 'new-calc-' + Math.random().toString()

describe(filename, () => {

  it('find app window by user32.EnumWindows()', (done) => {
    const child = spawn('calc.exe')
    const enumWindowsProc = createEnumWinProc()

    of(null).pipe(
      delay(1500),
      tap(() => {
        const lpszClass = Buffer.from('CalcFrame\0', 'ucs2')
        const hWnd = user32.FindWindowExW(0, 0, lpszClass, null)

        if (typeof hWnd === 'number' && hWnd > 0
          || typeof hWnd === 'bigint' && hWnd > 0
          || typeof hWnd === 'string' && hWnd.length > 0
        ) {
          // Change title of the Calculator
          user32.SetWindowTextW(hWnd, Buffer.from(title + '\0', 'ucs2'))

          const buf = Buffer.alloc(title.length * 2)
          let str = ''

          user32.GetWindowTextW(hWnd, buf, buf.byteLength)
          str = buf.toString('ucs2').replace(/\0+$/, '')
          assert(str === title, `title should be changed to ${title}, bug got ${str}`)

          const id = Math.round(Math.random() * 1000000)
          const idStr = id.toString()
          tmpMap.set(idStr, false)
          enumWindows(enumWindowsProc, id)
          assert(tmpMap.get(idStr) === true)
          tmpMap.clear()
        }
        else {
          assert(false, 'NOt found calc window')
        }

      }),
    )
      .subscribe(
        () => { void 0 },
        (err) => {
          assert(false, err)
          child.kill()
          done()
        },
        () => {
          child.kill()
          done()
        },
      )

  })

})


/**
 * Note: It will got "errno 3221225725"
 * if calling frequently in a short time
 */
function createEnumWinProc(): M.WNDENUMPROC {
  const enumWindowsProc = ffi.Callback(
    W.BOOL,
    [W.HWND, W.LPARAM],
    (hWnd: M.HWND, lParam: M.LPARAM): M.BOOLEAN => {
      const visible = user32.IsWindowVisible(hWnd)
      if (! visible) {
        return true
      }

      const buf = Buffer.alloc(254)
      const len = user32.GetWindowTextW(hWnd, buf, buf.byteLength)

      if (len && len === title.length) {
        const name = buf.toString('ucs2').replace(/\0+$/, '')

        if (name === title) {
          tmpMap.set(lParam.toString(), true)
          return false // stop loop if return false
        }
      }

      return true
    },
  )

  process.on('exit', () => {
    // tslint:disable-next-line:no-unused-expression
    typeof enumWindowsProc // avoid gc
  })

  return enumWindowsProc
}


function enumWindows(proc: M.WNDENUMPROC, id: M.UINT32): void {
  user32.EnumWindows(proc, id)
}
