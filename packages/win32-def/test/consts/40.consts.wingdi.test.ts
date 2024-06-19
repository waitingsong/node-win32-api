/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import * as consts from '../../src/index.consts.js'


describe(fileShortPath(import.meta.url), () => {

  describe('wingdi.h should work', () => {
    it('normal', () => {
      assert(Object.keys(consts).length > 0)
      assert(consts.DISPLAYCONFIG_ROTATION.DISPLAYCONFIG_ROTATION_IDENTITY === 1)
    })
  })

})

