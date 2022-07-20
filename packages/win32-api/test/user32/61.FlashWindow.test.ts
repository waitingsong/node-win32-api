import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'

import { fileShortPath } from '@waiting/shared-core'
import ref from 'ref-napi'
import { sleep } from 'zx'

// import * as CS from '../../src/index.consts.js'
import { user32FindWindowEx } from '../../src/index.fun.js'
import { calcLpszNotepad } from '../config.unittest.js'
import { user32, destroyWin } from '../helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe('Should FlashWindow() work', () => {
    it('true', async () => {
      const child = spawn('notepad.exe')
      await sleep(1000)

      const hWnd = await user32FindWindowEx(0, 0, calcLpszNotepad, null)
      assert((typeof hWnd === 'string' && hWnd.length > 0) || hWnd > 0)

      const state = await user32.FlashWindow(hWnd, 1)
      assert(state > 0)
      await sleep(100)
      const state2 = await user32.FlashWindow(hWnd, 0)
      assert(state2 === 0, state2.toString())

      // await sleep(10000)
      await destroyWin(hWnd)
      child.kill()
    })

    it('false', async () => {
      const child = spawn('notepad.exe')
      await sleep(1000)

      const hWnd = await user32FindWindowEx(0, 0, calcLpszNotepad, null)
      assert((typeof hWnd === 'string' && hWnd.length > 0) || hWnd > 0)

      const state = await user32.FlashWindow(hWnd, 0)
      assert(state > 0)

      // await sleep(10000)
      await destroyWin(hWnd)
      child.kill()
    })

  })
})

