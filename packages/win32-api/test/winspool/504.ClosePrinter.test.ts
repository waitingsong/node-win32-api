import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import {
  winspoolClosePrinter,
  winspoolGetDefaultPrinter,
  winspoolGetPrinter,
  winspoolOpenPrinter,
} from '../../src/index.fun.js'
import { CI } from '../root.config.js'


describe(fileShortPath(import.meta.url), () => {

  describe('Should winspoolClosePrinter() work', () => {
    it('normal', async () => {
      const pname = await winspoolGetDefaultPrinter()
      assert(pname)
      const hWnd = await winspoolOpenPrinter(pname)
      assert(hWnd)

      const ret = await winspoolClosePrinter(hWnd)
      assert(ret)
    })

    it('twice', async () => {
      const pname = await winspoolGetDefaultPrinter()
      assert(pname)
      const hWnd = await winspoolOpenPrinter(pname)
      assert(hWnd)

      await winspoolClosePrinter(hWnd)
      const ret = await winspoolClosePrinter(hWnd)
      assert(! ret)
    })

  })
})

