import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'

import { fileShortPath, sleep } from '@waiting/shared-core'

import { FindWindowExW } from '##/index.util.js'


describe(fileShortPath(import.meta.url), () => {
  describe('FindWindowExW()', () => {
    it('find Notepad hwnd', async () => {
      const child = spawn('notepad.exe')
      try {
        await sleep(1500)
        const hwnd = await FindWindowExW(0, 0, 'Notepad', null)
        assert(typeof hwnd === 'number' || typeof hwnd === 'bigint')
        assert(hwnd)

        const hwnd2 = await FindWindowExW(0, 0, 'Notepad', null)
        assert(typeof hwnd2 === 'number' || typeof hwnd2 === 'bigint')
        assert(hwnd2)
      }
      finally {
        child.kill()
      }
    })
  })

})

