/// <reference types="node" />
/// <reference types="mocha" />

import { spawn, ChildProcess } from 'child_process'
import { basename } from 'path'

import * as ffi from 'ffi'
import * as assert from 'power-assert'
import * as ref from 'ref-napi'
import { of } from 'rxjs'
import { delay, tap } from 'rxjs/operators'
import {
  DModel as M,
  DTypes as W,
} from 'win32-def'

import {
  knl32,
  user32,
} from './helper'


const filename = basename(__filename)
const tmpMap: Map<number, boolean> = new Map()
const title = 'new-calc-' + Math.random()

describe(filename, () => {

  it('find app window by user32.EnumWindows()', (done) => {
    const child = spawn('calc.exe')
    const enumWindowsProc = createEnumWinProc()

    of(null).pipe(
      delay(1000),
      tap(() => {
        const lpszClass = Buffer.from('CalcFrame\0', 'ucs2')
        const hWnd = user32.FindWindowExW(null, null, lpszClass, null)

        if (hWnd && ! ref.isNull(hWnd) && ref.address(hWnd)) {
          // Change title of the Calculator
          user32.SetWindowTextW(hWnd, Buffer.from(title + '\0', 'ucs2'))

          const buf = Buffer.alloc(title.length * 2)
          let str = ''

          user32.GetWindowTextW(hWnd, buf, buf.byteLength)
          str = buf.toString('ucs2').replace(/\0+$/, '')
          assert(str === title, `title should be changed to ${title}, bug got ${str}`)

          const id = Math.round(Math.random() * 1000000)
          tmpMap.set(id, false)
          enumWindows(enumWindowsProc, id)
          assert(tmpMap.get(id) === true)
        }
        else {
          assert(false, 'found no calc window, GetLastError: ' + knl32.GetLastError())
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
    (hWnd: M.HWND, lParam: M.INT32): M.BOOLEAN => { // stop loop if return false
      const visible = user32.IsWindowVisible(hWnd)
      if (! visible) {
        return true
      }

      const buf = Buffer.alloc(254)
      const len = user32.GetWindowTextW(hWnd, buf, buf.byteLength)

      if (len && len === title.length) {
        const name = buf.toString('ucs2').replace(/\0+$/, '')

        if (name === title) {
          tmpMap.set(lParam, true)
          return false
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


function enumWindows(proc: M.WNDENUMPROC, id: number): void {
  user32.EnumWindows(proc, id)
}
