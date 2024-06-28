import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { Kernel32 as Lib } from '##/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('Kernel32', () => {
    it('load', () => {
      const lib = Lib.load()
      assert(lib)
      assert(Object.keys(lib).length === Object.keys(Lib.DefKernel32).length * 2, 'lib function count not match')

      assert(typeof lib.FormatMessageW === 'function')
      assert(typeof lib.FormatMessageW_Async === 'function')
    })
  })

})

