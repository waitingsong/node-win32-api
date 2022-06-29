import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'

import { fileShortPath } from '@waiting/shared-core'
import ffi from 'ffi-napi'
import { of } from 'rxjs'
import { delay, tap } from 'rxjs/operators'
import {
  DModel as M,
  DTypes as W,
  DStruct as DS,
} from 'win32-def'

import { retrieveStructFromPtrAddress } from '../src/lib/helper.js'

import { calcLpszWindow } from './config.unittest.js'
import { user32, Struct } from './helper.js'


const tmpMap = new Map<number | string | bigint, M.POINT_Struct>()
const title = 'new-calc-' + Math.random().toString()

describe(fileShortPath(import.meta.url), () => {

  it('find app window by user32.EnumWindows()', (done) => {
    const child = spawn('calc.exe')
    const enumWindowsProc = createEnumWinProc()

    of(null).pipe(
      delay(3000),
      tap(() => {
        const hWnd = user32.FindWindowExW(0, 0, null, calcLpszWindow)

        if (typeof hWnd === 'number' && hWnd > 0
          || typeof hWnd === 'bigint' && hWnd > 0
          || typeof hWnd === 'string' && hWnd.length > 0
        ) {

          // Change title of the Calculator
          user32.SetWindowTextW(hWnd, Buffer.from(title + '\0', 'ucs2'))

          const len = title.length + 1
          assert(len > 0)
          const buf = Buffer.alloc(len * 2)
          let str = ''

          user32.GetWindowTextW(hWnd, buf, len)
          str = buf.toString('ucs2').replace(/\0+$/, '')
          assert(str === title, `title should be changed to ${title}, bug got ${str}`)

          const point = new Struct(DS.POINT)() as M.POINT_Struct
          point.x = 101
          point.y = Math.round(Math.random() * 1000000)

          const adress = point.ref().address()
          tmpMap.delete(adress)

          enumWindows(enumWindowsProc, adress)
          console.log({ adress })

          const point2 = tmpMap.get(adress)
          assert(point2, 'point2 should be got')
          if (point2) {
            assert(point.x === point2.x)
            assert(point.y === point2.y)
          }
          tmpMap.delete(adress)
        }
        else {
          assert(false, 'NOt found calc window')
        }

      }),
    )
      .subscribe(
        () => { void 0 },
        (err) => {
          child.kill()
          throw err
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

      const maxLen = 127
      const buf = Buffer.alloc(maxLen * 2)
      const len = user32.GetWindowTextW(hWnd, buf, maxLen)
      const name = buf.toString('ucs2').replace(/\0+$/, '')
      name && console.log(name, len)

      if (len && name === title) {
        if (typeof lParam === 'number') {
          const point = retrieveStructFromPtrAddress<M.POINT_Struct>(lParam, DS.POINT)
          if (point) {
            console.log({ px: point.x, py: point.y })
            tmpMap.set(lParam, point)
          }
        }
        return false // stop loop if return false
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

