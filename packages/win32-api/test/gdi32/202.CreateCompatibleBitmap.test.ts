import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { assertsHwnd, gdi32 } from '../helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe('Should CreateCompatibleBitmap() work', () => {
    it('normal', async () => {
      const hdc = await gdi32.CreateCompatibleDC(0)
      assert(hdc)

      const hBitmap = await gdi32.CreateCompatibleBitmap(hdc, 100, 100)
      console.log({ hBitmap })
      assertsHwnd(hBitmap)
    })
  })
})

