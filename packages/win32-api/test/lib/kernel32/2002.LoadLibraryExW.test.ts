import assert from 'node:assert/strict'

import { fileShortPath, sleep } from '@waiting/shared-core'

import { Kernel32 as Lib, ffi } from '##/index.js'


describe(fileShortPath(import.meta.url), () => {
  const lib = Lib.load()
  assert(lib)
  const hModule = lib.GetModuleHandleW(null)
  assert(hModule)

  describe('LoadLibraryExW()', () => {
    it('normal', async () => {
      const hwnd = lib.LoadLibraryExW('user32.dll', 0, 1)
      assert(hwnd)
    })
  })

})

