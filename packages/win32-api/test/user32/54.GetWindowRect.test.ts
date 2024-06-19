import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'

import { fileShortPath } from '@waiting/shared-core'
import { sleep } from 'zx'

import { user32FindWindowEx } from '../../src/index.fun.js'
import {
  Types as M,
  DTypes as W,
  DStruct as DS,
  StructFactory,
} from '../../src/index.js'
import { calcLpszWindow } from '../config.unittest.js'
import { user32, destroyWin, assertsHwnd } from '../helper.js'


describe.skip(fileShortPath(import.meta.url), () => {
  it('GetWindowRect()', async () => {
    const child = spawn('calc.exe')
    await sleep(1500)

    const rect = StructFactory<M.RECT>(DS.RECT)

    const hWnd = await user32FindWindowEx(0, 0, null, calcLpszWindow)
    assertsHwnd(hWnd)

    const ret = await user32.GetWindowRect(hWnd, rect.ref())
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

    await destroyWin(hWnd)
    child.kill()
  })

})

