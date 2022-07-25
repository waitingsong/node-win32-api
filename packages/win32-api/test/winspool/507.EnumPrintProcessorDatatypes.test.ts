import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'
import { PrinterEnumFlags } from 'win32-def/consts'

import {
  winspoolEnumPrinters,
  winspoolEnumPrintProcessorDatatypes,
  winspoolEnumPrintProcessors,
} from '../../src/index.fun.js'
import {
  DModel as M,
  DTypes as W,
  DStruct as DS,
  StructFactory,
} from '../../src/index.js'
import { CI } from '../root.config.js'
import { processDataTypes } from '../config.unittest.js'


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

      const [info] = ret
      assert(info)

      const pDataTypes = await winspoolEnumPrintProcessorDatatypes('', info.pName)
      assert(pDataTypes.length)
      pDataTypes.forEach((type, idx) => {
        console.log(`${idx}: ${type.pName}`)
        processDataTypes.includes(type.pName)
      })
    })

  })

})

