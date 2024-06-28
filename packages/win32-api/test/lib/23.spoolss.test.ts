import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { Spoolss as Lib } from '##/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('Spoolss', () => {
    it('load', () => {
      const lib = Lib.load()
      assert(lib)
      assert(Object.keys(lib).length === Object.keys(Lib.DefSpoolss).length * 2, 'lib function count not match')

      assert(typeof lib.EndDocPrinter === 'function')
      assert(typeof lib.EndDocPrinter_Async === 'function')
    })
  })

})

