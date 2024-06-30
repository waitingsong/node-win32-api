import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'

import { fileShortPath, sleep } from '@waiting/shared-core'
import { ucsBufferFrom, ucsBufferToString } from 'win32-def'
import { WNDCLASSEXW_Factory } from 'win32-def/struct'
import type { WNDCLASSEXW_Type } from 'win32-def/struct'

import { User32 as Lib, Kernel32 } from '##/index.js'
import { FindWindowEx } from '##/index.util.js'


describe(fileShortPath(import.meta.url), () => {
  const lib = Lib.load()
  assert(lib)
  const libKnl = Kernel32.load()
  assert(libKnl)
  const hModule = libKnl.GetModuleHandleW(null)
  assert(hModule)

  describe('GetClassNameW()', () => {
    it('normal', async () => {
      const child = spawn('notepad.exe')

      try {
        await sleep(1500)
        const hwnd = await FindWindowEx(0, 0, 'Notepad', null)
        assert(hwnd)

        const buf = Buffer.alloc(1024)
        const ret = lib.GetClassNameW(hwnd, buf, 256)
        assert(ret)
        const text = ucsBufferToString(buf)
        assert(text === 'Notepad')
      }
      finally {
        child.kill()
      }
    })
  })

})

