import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import * as consts from '../../src/index.consts.js'


describe(fileShortPath(import.meta.url), () => {

  describe('winuser.h should work', () => {
    it('FLASHHW_ALL', () => {
      assert(Object.keys(consts).length > 0)
      assert(consts.FLASHW_ALL === 0x03)
    })
  })

})

