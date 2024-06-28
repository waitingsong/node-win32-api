import assert from 'node:assert/strict'

import { fileShortPath, sleep } from '@waiting/shared-core'

import { GetDefaultPrinter } from '##/index.util.js'


describe(fileShortPath(import.meta.url), () => {
  describe('GetDefaultPrinter()', () => {

    it('normal', async () => {
      const pName = await GetDefaultPrinter()
      assert(pName)
      console.log('default printer:', pName)
    })

    it('max512', async () => {
      const pName = await GetDefaultPrinter(512)
      assert(pName)
      console.log('default printer:', pName)
    })

    it('max3', async () => {
      const pName = await GetDefaultPrinter(3)
      assert(pName === null)
    })
  })

})

