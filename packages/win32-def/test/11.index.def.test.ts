import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { Def, POINT } from '../src/index.def.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should work', () => {
    it('Def', () => {
      assert(Def)
      assert(Object.keys(Def).length > 0)
    })

    it('POINT', () => {
      assert(POINT)
      assert(POINT === Def.ptr)
    })
  })

})

