import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'
import ref from 'ref-napi'
import { sleep } from 'zx'

import * as CS from '../../src/index.consts.js'
import { winspoolGetDefaultPrinter } from '../../src/index.fun.js'
import {
  DModel as M,
  DTypes as W,
  DStruct as DS,
  StructFactory,
} from '../../src/index.js'
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

