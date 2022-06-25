import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'

import { fileShortPath } from '@waiting/shared-core'
import {
  DModel as M,
  DStruct as DS,
  DTypes as W,
  FModel as FM,
} from 'win32-def'

import { calcLpszWindow } from '../config.unittest.js'
import { user32, Struct, destroyWin } from '../helper.js'


describe(fileShortPath(import.meta.url), () => {
  it('GetWindowRect()', (done) => {
    const child = spawn('calc.exe')
    setTimeout(() => {
      const rect: M.RECT_Struct = new Struct(DS.RECT)() as M.RECT_Struct
      const hWnd = user32.FindWindowExW(0, 0, null, calcLpszWindow)
      assert(hWnd > 0 || hWnd.toString().length > 0)

      const ret = user32.GetWindowRect(hWnd, rect.ref())
      assert(ret !== 0)
      assert(ret)
      console.log({
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom,
      })
      assert(rect.top >= 0)
      assert(rect.left >= 0)
      assert(rect.right > 0)
      assert(rect.bottom > 0)
      destroyWin(hWnd)
      child.kill()
      done()
    }, 1500)
  })

})

