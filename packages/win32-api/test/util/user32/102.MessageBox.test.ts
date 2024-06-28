import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'

import { fileShortPath, sleep } from '@waiting/shared-core'

import { FindWindowEx, MessageBox } from '##/index.util.js'
import { testConfig } from '#@/root.config.js'

// Run this test manually

describe.skip(fileShortPath(import.meta.url), () => {
  describe('MessageBox()', () => {
    it('create top diag ', async () => {
      const res = await MessageBox({
        hWnd: 0,
        lpText: 'box-content',
        lpCaption: 'box-title',
        uType: 0x00000002,
        wLanguageId: 0,
      })
      assert(res)
    })

    it('create diag over notepad', async () => {
      const expectTitle = testConfig.isWinChinese ? '无标题 - 记事本' : 'Untitled - Notepad'

      const child = spawn('notepad.exe')
      try {
        await sleep(1500)
        const hwnd = await FindWindowEx(0, 0, 'Notepad', null)
        assert(hwnd)

        const res = await MessageBox({
          hWnd: hwnd,
          lpText: 'box-content',
          lpCaption: 'box-title',
          uType: 0x00000002,
          wLanguageId: 0,
        })
        assert(res)
      }
      finally {
        child.kill()
      }
    })

  })

})

