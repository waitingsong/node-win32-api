/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { VirtualKey } from '##/index.consts.js'


describe(fileShortPath(import.meta.url), () => {

  describe('wingdi.h should work', () => {
    it('normal', () => {
      assert(Object.keys(VirtualKey).length > 0)
      assert(VirtualKey.VK_LBUTTON === 0x01)
    })
  })

})

