import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'
import { ucsBufferFrom } from 'win32-def'

import { DllNames, Kernel32 as Lib, ffi } from '##/index.js'


describe(fileShortPath(import.meta.url), () => {
  describe('GetModuleHandleExW()', () => {
    const name = DllNames.kernel32 + '.dll'

    it('string', () => {
      const lib = Lib.load()
      assert(lib)

      const buf = Buffer.alloc(8)
      const ret = lib.GetModuleHandleExW(0, name, buf)
      assert(ret)
      const hModule = buf.readBigUint64LE()
      assert(hModule)
      const h2 = ffi.decode(buf, 'uintptr') as number
      assert(h2.toString() === hModule.toString())
    })

    it('buffer', () => {
      const lib = Lib.load()
      assert(lib)

      const buf = Buffer.alloc(8)
      const ret = lib.GetModuleHandleExW(0, ucsBufferFrom(name), buf)
      assert(ret)
      const hModule = buf.readBigUint64LE()
      assert(hModule)
      const h2 = ffi.decode(buf, 'uintptr') as number
      assert(h2.toString() === hModule.toString())
    })
  })

})

