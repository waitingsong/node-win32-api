import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'

import { fileShortPath, sleep } from '@waiting/shared-core'

import { FindWindowEx, GetWindowText } from '##/index.util.js'
import { testConfig } from '#@/root.config.js'


describe(fileShortPath(import.meta.url), () => {
  describe('GetWindowText()', () => {

    it('find Notepad hwnd', async () => {
      const expectTitle = testConfig.isWinChinese ? '无标题 - 记事本' : 'Untitled - Notepad'

      const child = spawn('notepad.exe')
      try {
        await sleep(1500)
        const hwnd = await FindWindowEx(0, 0, 'Notepad', null)
        assert(hwnd)

        const count = 128
        const title = await GetWindowText(hwnd, count)
        console.log({ title })
        assert(title)
        assert(title === testConfig.notepadTitle)
      }
      finally {
        child.kill()
      }
    })

    it('find Notepad hwnd - count', async () => {
      const child = spawn('notepad.exe')
      try {
        await sleep(1500)
        const hwnd = await FindWindowEx(0, 0, 'Notepad', null)
        assert(hwnd)

        const count = 2 // include null terminator
        const title = await GetWindowText(hwnd, count)
        console.log({ title })
        assert(title)
        assert(title === testConfig.notepadTitle.slice(0, count - 1)) // exclude null terminator
      }
      finally {
        child.kill()
      }
    })
  })

})

