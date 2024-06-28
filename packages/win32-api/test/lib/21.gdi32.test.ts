import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { Gdi32 as Lib } from '##/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('Gdi32', () => {
    it('load', () => {
      const lib = Lib.load()
      assert(lib)
      assert(Object.keys(lib).length === Object.keys(Lib.DefGdi32).length * 2, 'lib function count not match')

      assert(typeof lib.CreateCompatibleBitmap === 'function')
      assert(typeof lib.CreateCompatibleBitmap_Async === 'function')
    })
  })

})

