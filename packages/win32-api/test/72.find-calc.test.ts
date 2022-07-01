import { spawn } from 'child_process'
import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'
import { sleep } from 'zx'

import { calcLpszWindow } from './config.unittest.js'
import {
  destroyWin,
  user32,
} from './helper.js'


describe(fileShortPath(import.meta.url), () => {
  it('Open a calc.exe and find it\'s window hWnd', async () => {
    const child = spawn('calc.exe')
    await sleep(1500)

    const hWnd = await user32.FindWindowExW(0, 0, null, calcLpszWindow)
    assert((typeof hWnd === 'string' && hWnd.length > 0) || hWnd > 0, 'found no calc window')

    await destroyWin(hWnd)
    child.kill()
  })

  it('Open a calc.exe and change it\'s window title', async () => {
    const child = spawn('calc.exe')
    await sleep(1500)

    const hWnd = await user32.FindWindowExW(0, 0, null, calcLpszWindow)
    assert((typeof hWnd === 'string' && hWnd.length > 0) || hWnd > 0)

    const title = 'Node-Calculator'
    const len = title.length + 1
    // Change title of the Calculator
    const res = await user32.SetWindowTextW(hWnd, Buffer.from(title + '\0', 'ucs2'))

    if (! res) {
      // https://github.com/node-ffi/node-ffi/issues/261
      // See: [System Error Codes] below
      // const errcode = knl32.GetLastError()
      // const len = 255
      // const buf = Buffer.alloc(len)
      // const p = 0x00001000 | 0x00000200 // FORMAT_MESSAGE_FROM_SYSTEM | FORMAT_MESSAGE_IGNORE_INSERTS
      // const langid = 0x0409 // 0x0409: US, 0x0000: Neutral locale language
      // const msglen = knl32.FormatMessageW(p, null, errcode, langid, buf, len, null)

      // if (msglen) {
      //   const errmsg = ref.reinterpretUntilZeros(buf, 2).toString('ucs2')
      //   assert(false, `window found but change the title failed. errcode: ${errcode}, errmsg: "${errmsg}"`)
      // }
      assert(false, 'user32.SetWindowTextW() failed')
    }
    else {
      const buf = Buffer.alloc(len * 2)
      await user32.GetWindowTextW(hWnd, buf, len)
      const str = buf.toString('ucs2').replace(/\0+$/, '')
      assert(str === title, `title should be changed to "${title}", bug got "${str}"`)
    }

    await destroyWin(hWnd)
    child.kill()
  })

})

