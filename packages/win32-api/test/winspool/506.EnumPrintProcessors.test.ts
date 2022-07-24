import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'
import { PrinterEnumFlags } from 'win32-def/consts'

import {
  winspoolEnumPrinters,
  winspoolEnumPrintProcessors,
} from '../../src/index.fun.js'
import {
  DModel as M,
  DTypes as W,
  DStruct as DS,
  StructFactory,
} from '../../src/index.js'
import { CI } from '../root.config.js'


describe(fileShortPath(import.meta.url), () => {

  describe('Should work ', () => {
    it.only('normal', async () => {
      const ret = await winspoolEnumPrintProcessors()
      assert(ret && ret.length)
      ret.forEach((info) => {
        console.log(info.pName)
      })
    })


  })

})

