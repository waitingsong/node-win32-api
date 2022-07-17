import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'

import { fileShortPath } from '@waiting/shared-core'
import ref from 'ref-napi'
import { sleep } from 'zx'

import * as CS from '../../src/index.consts.js'
import {
  calcLpszClassNotepad,
  calcLpszClassNotepadEdit,
} from '../config.unittest.js'
import { user32, destroyWin } from '../helper.js'


describe(fileShortPath(import.meta.url), () => {

  it('Should send WM_SETTEXT, WM_GETTEXT works', async () => {
    const child = spawn('notepad.exe')
    await sleep(1500)

    const hWnd = await user32.FindWindowExW(0, 0, calcLpszClassNotepad, null)
    assert((typeof hWnd === 'string' && hWnd.length > 0) || hWnd > 0)

    const hWndEdit = await user32.FindWindowExW(hWnd, 0, calcLpszClassNotepadEdit, null)
    assert((typeof hWndEdit === 'string' && hWndEdit.length > 0) || hWndEdit > 0)

    const txt = 'Hello World.' + Math.random().toString()
    const msgBuff = Buffer.from(`${txt}\0`, 'ucs2')
    const msgBuffAddr = ref.address(msgBuff)

    await user32.SendMessageW(hWndEdit, CS.WM_SETTEXT, 0, msgBuffAddr)

    const len = await user32.SendMessageW(hWndEdit, CS.WM_GETTEXTLENGTH, 0, 0)
    assert(len > 0)
    assert(len === txt.length)

    const size = len + 1
    const getTextBuf = Buffer.alloc(size * 2)
    const getTextBufAddr = ref.address(getTextBuf)

    const ret = await user32.SendMessageW(hWndEdit, CS.WM_GETTEXT, size, getTextBufAddr)
    assert(ret === len)

    const txtResult = getTextBuf.toString('ucs2', 0, len * 2)
    console.log({ txtResult, txt })
    assert(txtResult === txt)

    await sleep(1000)

    await destroyWin(hWnd)
    child.kill()
  })

})

