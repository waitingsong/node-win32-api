import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { Comctl32 as Lib } from '##/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('Comctl32', () => {
    it('load', () => {
      const lib = Lib.load()
      assert(lib)
      assert(Object.keys(lib).length === Object.keys(Lib.DefComctl32).length * 2, 'lib function count not match')

      assert(typeof lib.InitCommonControlsEx === 'function')
      assert(typeof lib.InitCommonControlsEx_Async === 'function')
    })
  })

})

