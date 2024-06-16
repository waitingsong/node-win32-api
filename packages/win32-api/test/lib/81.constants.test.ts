import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import * as CS from '##/index.consts.js'
import { MN_GETHMENU } from '##/index.consts.js'
import { Constants } from '##/index.js'


describe(fileShortPath(import.meta.url), () => {
  describe('Should Constants exported correctly', () => {
    it('Constants.MN_GETHMENU', () => {
      assert(CS.MN_GETHMENU === 481)
      assert(Constants.MN_GETHMENU === 481)
      assert(MN_GETHMENU === 481)
    })

    it('Constants.WM_QUIT', () => {
      assert(CS.WM_QUIT === 18)
      assert(Constants.WM_QUIT === 18)
    })

    it('Constants.WM_COPYDATA', () => {
      assert(CS.WM_COPYDATA === 74)
      assert(Constants.WM_COPYDATA === 74)
    })
  })

})

