import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { testBaseDir } from './root.config.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should work', () => {
    it('always passed', () => {
      assert(testBaseDir)
    })
  })

})

