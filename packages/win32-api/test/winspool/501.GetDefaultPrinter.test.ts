import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { winspoolGetDefaultPrinter } from '../../src/index.fun.js'
import { CI } from '../root.config.js'


describe(fileShortPath(import.meta.url), () => {

  describe('Should work', () => {
    it('normal', async () => {
      const ret = await winspoolGetDefaultPrinter()
      assert(ret)
      assert(ret.length)
      console.log(ret)
      if (CI) {
        assert(ret === 'Microsoft Print to PDF')
      }
    })

    it('cache', async () => {
      const ret = await winspoolGetDefaultPrinter()
      assert(ret)
      assert(ret.length)
      if (CI) {
        assert(ret === 'Microsoft Print to PDF')
      }
    })
  })
})

