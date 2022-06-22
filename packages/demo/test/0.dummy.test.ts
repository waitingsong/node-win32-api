import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'


describe(fileShortPath(import.meta.url), () => {

  describe('should work', () => {
    it('always passed', () => {
      assert(true)
    })
  })

})

