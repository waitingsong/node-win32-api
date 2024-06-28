import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { User32 as Lib } from '##/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('User32', () => {
    it('load', () => {
      const lib = Lib.load()
      assert(lib)

      const len = Object.keys(lib).length
      assert(len > 0, 'ffi lib object is empty')

      assert(typeof lib.BringWindowToTop === 'function', 'lib.BringWindowToTop is not function')
      assert(typeof lib.BringWindowToTop_Async === 'function', 'lib.BringWindowToTopAsync is not function')
    })
  })

})

