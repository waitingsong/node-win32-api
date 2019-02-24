/// <reference types="node" />
/// <reference types="mocha" />

import { spawn, ChildProcess } from 'child_process'
import * as ffi from 'ffi'
import { basename } from 'path'
import * as assert from 'power-assert'
import * as ref from 'ref'
import { of } from 'rxjs'
import { delay, tap } from 'rxjs/operators'

import {
  Config as GCF,
  DModel as M,
  DTypes as W,
  K,
  U,
 } from '../src/index'


const knl32 = K.load()
const user32 = U.load()

const filename = basename(__filename)
const tmpMap: Map<number, boolean> = new Map()
const title = 'new-calc-' + Math.random() + '\0'

describe(filename, () => {

  it('find app window by user32.EnumWindows()', done => {
    const child = spawn('calc.exe')

    of(null).pipe(
      delay(2000),
      tap(() => {
        const lpszClass = Buffer.from('CalcFrame\0', 'ucs2')
        const hWnd = user32.FindWindowExW(null, null, lpszClass, null)

        if (hWnd && !ref.isNull(hWnd) && ref.address(hWnd)) {
          // Change title of the Calculator
          user32.SetWindowTextW(hWnd, Buffer.from(title, 'ucs2'))

          const len = title.length
          const buf = Buffer.alloc(len * 2)
          let str: string = ''

          user32.GetWindowTextW(hWnd, buf, len)
          str = buf.toString('ucs2')
          assert(str === title, `title should be changed to ${title}, bug got ${str}`)

          const id = Math.round(Math.random() * 1000000)
          tmpMap.set(id, false)
          findWindow(id)
          assert(tmpMap.get(id) === true)
        }
        else {
          assert(false, 'found no calc window, GetLastError: ' + knl32.GetLastError())
        }

      }),
    )
      .subscribe(
        () => {},
        err => assert(false, err),
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
const enumWindowsProc = ffi.Callback(
  W.BOOL, [W.HWND, W.LPARAM],
  (hWnd: M.HWND, lParam: M.INT32): boolean => { // stop loop if return false
    const visible = user32.IsWindowVisible(hWnd)
    if (! visible) {
      return true
    }

    const buf = Buffer.alloc(254)
    const len = user32.GetWindowTextW(hWnd, buf, 254)

    if (len) {
      const name = buf.toString('ucs2')

      if (name.indexOf(title) === 0) {
        tmpMap.set(lParam, true)
        return false
      }
    }

    return true
  },
)

function findWindow(id: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const ret = user32.EnumWindows(enumWindowsProc, id)
    return ret === 0 ? resolve() : reject()
  })
}
