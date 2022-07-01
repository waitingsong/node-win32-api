import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { Def } from '../src/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should index work', () => {
    it('Def', () => {
      assert(Def)
      assert(Object.keys(Def).length > 0)
    })
  })

})

