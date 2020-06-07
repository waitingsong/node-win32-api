/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { spawn } from 'child_process'
import { basename } from 'path'

import * as assert from 'power-assert'
import * as ref from 'ref-napi'
import {
  DModel as M,
  DStruct as DS,
  DTypes as W,
  FModel as FM,
} from 'win32-def'

import { user32, Struct, destroyWin } from '../helper'


const filename = basename(__filename)

describe(filename, () => {
  it('GetWindowRect()', (done) => {
    const child = spawn('calc.exe')
    setTimeout(() => {
      const rect: M.RECT_Struct = new Struct(DS.RECT)()
      const lpszClass = Buffer.from('CalcFrame\0', 'ucs2')
      const hWnd = user32.FindWindowExW(0, 0, lpszClass, null)
      assert(hWnd > 0 || hWnd.toString().length > 0)

      const ret = user32.GetWindowRect(hWnd, rect.ref())
      assert(ret !== 0)
      assert(rect.top > 0 && rect.left > 0 && rect.right > 0 && rect.bottom > 0)
      destroyWin(hWnd)
      console.log({
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom,
      })
      child.kill()
      done()
    }, 1500)
  })

})

