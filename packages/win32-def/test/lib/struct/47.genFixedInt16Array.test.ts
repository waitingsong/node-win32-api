import assert from 'node:assert'

import { fileShortPath } from '@waiting/shared-core'
import ffi from 'koffi'

import { genFixedInt16Array } from '##/index.js'


describe(fileShortPath(import.meta.url), () => {
  describe('genFixedInt16Array()', () => {
    it('normal', async () => {
      const arr = genFixedInt16Array(4)
      assert(arr)

      const info = ffi.introspect(arr)
      assert(info.name === 'int16_t[4]')
      assert(info.alignment === 2)
      assert(info.hint === 'Typed')
      assert(info.length === 4)
      assert(info.size === 8)
    })
  })
})

