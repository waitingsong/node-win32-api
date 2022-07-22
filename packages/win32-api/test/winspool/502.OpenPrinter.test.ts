import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import {
  winspoolGetDefaultPrinter,
  winspoolOpenPrinter,
} from '../../src/index.fun.js'


describe(fileShortPath(import.meta.url), () => {

  describe('Should work', () => {
    it('normal', async () => {
      const name = await winspoolGetDefaultPrinter()
      assert(name)
      const hWnd = await winspoolOpenPrinter(name)
      assert(hWnd)
    })

    it('fake', async () => {
      const hWnd = await winspoolOpenPrinter(Math.random().toString())
      assert(! hWnd)
    })
  })
})

