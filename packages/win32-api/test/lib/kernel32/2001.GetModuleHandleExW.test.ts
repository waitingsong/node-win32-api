import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'
import { ucsBufferFrom } from 'win32-def'

import { Kernel32 as Lib, DllNames } from '##/index.js'


describe.only(fileShortPath(import.meta.url), () => {
  describe('GetModuleHandleExW()', () => {
    const name = DllNames.kernel32 + '.dll'

    it('string', () => {
      const lib = Lib.load()
      assert(lib)

      const buf = Buffer.alloc(256)
      const ret = lib.GetModuleHandleExW(0, name, buf)
      assert(ret)
      const hModule = buf.readBigUint64LE()
      assert(hModule)
    })

    it('buffer', () => {
      const lib = Lib.load()
      assert(lib)

      const buf = Buffer.alloc(256)
      const ret = lib.GetModuleHandleExW(0, ucsBufferFrom(name), buf)
      assert(ret)
      const hModule = buf.readBigUint64LE()
      assert(hModule)
    })
  })

})

