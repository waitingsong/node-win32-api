import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { gdi32 } from '../helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe('Should CreateCompatibleDC() work', () => {
    it('normal', async () => {
      const hdc = await gdi32.CreateCompatibleDC(0)
      console.log({ hdc })
      assert(hdc)
    })
  })
})

