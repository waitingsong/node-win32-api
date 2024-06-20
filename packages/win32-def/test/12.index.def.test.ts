import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { Def } from '../src/index.def.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should work', () => {
    it('Def', () => {
      assert(Def)
      assert(Object.keys(Def).length > 0)
    })
  })

})

