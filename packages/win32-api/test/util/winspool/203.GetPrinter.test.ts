import assert from 'node:assert/strict'

import { fileShortPath, sleep } from '@waiting/shared-core'

import { ClosePrinter, GetPrinter, OpenPrinter } from '##/index.util.js'


describe(fileShortPath(import.meta.url), () => {
  const pName = 'Microsoft Print to PDF'

  describe('GetPrinter()', () => {
    it(pName, async () => {
      const hwnd = await OpenPrinter(pName)
      assert(hwnd)

      try {
        const info = await GetPrinter({ hPrinter: hwnd, Level: 1 })
        assert(info)
        assert(info.pName === pName, JSON.stringify(info))
      }
      finally {
        await sleep(100)
        assert(await ClosePrinter(hwnd))
      }
    })

    it('Level=6', async () => {
      const hwnd = await OpenPrinter(pName)
      assert(hwnd)

      try {
        const info = await GetPrinter({ hPrinter: hwnd, Level: 6 })
        assert(info)
      }
      finally {
        await sleep(100)
        assert(await ClosePrinter(hwnd))
      }
    })
  })
})

