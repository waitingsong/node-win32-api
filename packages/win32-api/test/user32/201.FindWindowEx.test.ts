import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'

import { fileShortPath } from '@waiting/shared-core'
import { sleep } from 'zx'

import { user32FindWindowEx } from '../../src/index.fun.js'
import { calcLpszNotepad } from '../config.unittest.js'
import { assertsHwnd } from '../helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe('Should work', () => {
    it('normal', async () => {
      const child = spawn('notepad.exe')
      await sleep(1000)

      const hWnd = await user32FindWindowEx(0, 0, calcLpszNotepad, null)
      assert(hWnd)
      assertsHwnd(hWnd)

      child.kill()
    })
  })
})


