import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'

import { fileShortPath } from '@waiting/shared-core'
import ref from 'ref-napi'
import { FLASHW_ALL, FLASHW_CAPTION } from 'win32-def/consts'
import { sleep } from 'zx'

// import * as CS from '../../src/index.consts.js'
import { user32FindWindowEx } from '../../src/index.fun.js'
import {
  DModel as M,
  DTypes as W,
  DStruct as DS,
  StructFactory,
} from '../../src/index.js'
import { calcLpszNotepad } from '../config.unittest.js'
import { user32, destroyWin, assertsHwnd } from '../helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe('Should FlashWindowEx() work', () => {
    it('FLASHW_ALL', async () => {
      const child = spawn('notepad.exe')
      await sleep(1000)

      const hWnd = await user32FindWindowEx(0, 0, calcLpszNotepad, null)
      assertsHwnd(hWnd)

      const pfwi = StructFactory<M.FLASHWINFO>(DS.FLASHWINFO)
      pfwi.cbSize = pfwi.ref().byteLength
      pfwi.hwnd = hWnd
      pfwi.dwFlags = FLASHW_ALL // 0x03
      pfwi.uCount = 10 // sec
      pfwi.dwTimeout = 0

      await user32.FlashWindowEx(pfwi.ref())

      await sleep(3000)
      await destroyWin(hWnd)
      child.kill()
    })

    it('FLASHW_CAPTION', async () => {
      const child = spawn('notepad.exe')
      await sleep(1000)

      const hWnd = await user32FindWindowEx(0, 0, calcLpszNotepad, null)
      assertsHwnd(hWnd)

      const pfwi = StructFactory<M.FLASHWINFO>(DS.FLASHWINFO)
      pfwi.cbSize = pfwi.ref().byteLength
      pfwi.hwnd = hWnd
      pfwi.dwFlags = FLASHW_CAPTION // 0x01
      pfwi.uCount = 10 // sec
      pfwi.dwTimeout = 0

      await user32.FlashWindowEx(pfwi.ref())

      await sleep(3000)
      await destroyWin(hWnd)
      child.kill()
    })
  })

})

