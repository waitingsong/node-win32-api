import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { Winspool as Lib } from '##/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('Winspool', () => {
    it('load', () => {
      const lib = Lib.load()
      assert(lib)
      assert(Object.keys(lib).length === Object.keys(Lib.DefWinspool).length * 2, 'lib function count not match')

      assert(typeof lib.ClosePrinter === 'function')
      assert(typeof lib.ClosePrinter_Async === 'function')
    })
  })

})

