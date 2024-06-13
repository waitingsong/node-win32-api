import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'

import { fileShortPath } from '@waiting/shared-core'
import ref from 'ref-napi'
import { sleep } from 'zx'

import * as CS from '../../src/index.consts.js'
import { user32FindWindowEx } from '../../src/index.fun.js'
import { ucsBufferFrom } from '../../src/index.js'
import {
  calcLpszNotepad,
  calcLpszNotepadEdit,
} from '../config.unittest.js'
import { user32, destroyWin, assertsHwnd } from '../helper.js'


describe(fileShortPath(import.meta.url), () => {

  it('Should send WM_SETTEXT to Notepad work', async () => {
    const child = spawn('notepad.exe')
    await sleep(1500)

    const hWnd = await user32FindWindowEx(0, 0, calcLpszNotepad, null)
    assertsHwnd(hWnd)

    const hWndEdit = await user32FindWindowEx(hWnd, 0, calcLpszNotepadEdit, null)
    assertsHwnd(hWndEdit)

    const txt = 'Hello World.' + Math.random().toString()
    const msgBuff = ucsBufferFrom(txt)
    const msgBuffAddr = ref.address(msgBuff)

    await user32.SendMessageW(hWndEdit, CS.WM_SETTEXT, 0, msgBuffAddr)
    await sleep(1000)

    await destroyWin(hWnd)
    child.kill()
  })

})

