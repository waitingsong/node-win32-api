import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'
import { ucsBufferFrom } from 'win32-def'

import { Kernel32 as Lib, DllNames } from '##/index.js'


describe(fileShortPath(import.meta.url), () => {
  describe('GetModuleHandleW()', () => {
    const name = DllNames.kernel32 + '.dll'

    it('null', () => {
      const lib = Lib.load()
      assert(lib)

      const hModule = lib.GetModuleHandleW(null)
      assert(hModule)
    })

    it('string', () => {
      const lib = Lib.load()
      assert(lib)

      const hModule = lib.GetModuleHandleW(name)
      assert(hModule)
    })

    it('buffer', () => {
      const lib = Lib.load()
      assert(lib)

      const hModule = lib.GetModuleHandleW(ucsBufferFrom(name))
      assert(hModule)
    })
  })

})

