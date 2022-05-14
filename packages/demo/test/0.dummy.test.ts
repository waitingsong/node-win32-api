import assert from 'node:assert/strict'

import { fileShortPath } from './_helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should work', () => {
    it('always passed', () => {
      assert(true)
    })
  })

})

