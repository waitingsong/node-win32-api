import assert from 'node:assert/strict'

import { fileShortPath, sleep } from '@waiting/shared-core'

import { ClosePrinter, OpenPrinter } from '##/index.util.js'


describe(fileShortPath(import.meta.url), () => {
  describe('OpenPrinter()', () => {
    it('normal', async () => {
      const hwnd = await OpenPrinter('Microsoft Print to PDF')
      assert(hwnd)
      const res = await ClosePrinter(hwnd)
      assert(res, 'ClosePrinter() failed')
    })
  })
})

