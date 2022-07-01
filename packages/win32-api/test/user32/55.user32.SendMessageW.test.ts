import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'

import { fileShortPath } from '@waiting/shared-core'
import ref from 'ref-napi'
import { sleep } from 'zx'

import * as CS from '../../src/index.consts.js'
import {
  DModel as M,
  DTypes as W,
  DStruct as DS,
  StructFactory,
} from '../../src/index.js'
import { calcLpszWindow } from '../config.unittest.js'
import { user32, destroyWin } from '../helper.js'


describe(fileShortPath(import.meta.url), () => {
  it('Should send CS.WM_COMMAND and CS.WM_DESTROY works', async () => {
    const child = spawn('calc.exe')
    await sleep(1500)

    child.on('exit', (code) => {
      assert(code === 0)
    })
    child.on('error', (ex: Error) => {
      assert(false, ex.message)
    })

    const hWnd = await user32.FindWindowExW(0, 0, null, calcLpszWindow)
    assert((typeof hWnd === 'string' && hWnd.length > 0) || hWnd > 0)

    let ret = await user32.SendMessageW(hWnd, CS.WM_COMMAND, 1000, 3)
    assert(ret === 0)

    ret = await user32.SendMessageW(hWnd, CS.WM_DESTROY, 0, 0)
    assert(ret === 0)
  })

  it('Should send WM_COPYDATA works', async () => {
    const child = spawn('calc.exe')
    await sleep(1500)

    const hWnd = await user32.FindWindowExW(0, 0, null, calcLpszWindow)
    assert((typeof hWnd === 'string' && hWnd.length > 0) || hWnd > 0)

    const copyData = StructFactory<M.COPYDATASTRUCT>(DS.COPYDATASTRUCT)
    const msgBuff = Buffer.from('foo\0', 'ucs2')
    const msgBuffAddr = ref.address(msgBuff)
    copyData.dwData = msgBuffAddr
    const copyDataAddr = ref.address(copyData.ref())

    console.info({
      msgBuff, msgBuffAddr, copyDataAddr,
    })

    // send WM_COPYDATA (74) message
    const ret = await user32.SendMessageW(hWnd, CS.WM_COPYDATA, 0, copyDataAddr)
    assert(ret === 0)

    await destroyWin(hWnd)
    child.kill()
  })
})

