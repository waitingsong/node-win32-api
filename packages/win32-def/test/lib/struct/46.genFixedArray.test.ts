import assert from 'node:assert'

import { fileShortPath } from '@waiting/shared-core'
import ffi from 'koffi'

import { genFixedArray } from '##/index.js'


describe(fileShortPath(import.meta.url), () => {
  describe('genFixedArray()', () => {
    it('normal', async () => {
      const arr = genFixedArray(4)
      assert(arr)

      const info = ffi.introspect(arr)
      assert(info.name === 'int16_t[4]')
      assert(info.alignment === 2)
      assert(info.hint === 'Array')
      assert(info.length === 4)
      assert(info.size === 8)
    })
  })
})

