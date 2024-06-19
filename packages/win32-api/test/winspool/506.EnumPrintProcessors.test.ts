import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'
import { PrinterEnumFlags } from 'win32-def/consts'

import {
  winspoolEnumPrinters,
  winspoolEnumPrintProcessors,
} from '../../src/index.fun.js'
import {
  Types as M,
  DTypes as W,
  DStruct as DS,
  StructFactory,
} from '../../src/index.js'
import { CI } from '../root.config.js'


describe(fileShortPath(import.meta.url), () => {

  describe('Should work ', () => {
    it('normal', async () => {
      const ret = await winspoolEnumPrintProcessors()
      assert(ret && ret.length)
      ret.forEach((info) => {
        console.log(info.pName)
        if (typeof info.pName === 'string') {
          assert(info.pName === 'winprint')
        }
      })
    })


  })

})

