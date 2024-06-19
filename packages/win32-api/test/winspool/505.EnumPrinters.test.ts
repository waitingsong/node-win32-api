import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'
import { PrinterEnumFlags } from 'win32-def/consts'

import {
  winspoolOpenPrinter,
  winspoolEnumPrinters,
  EnumPrintersOptions,
} from '../../src/index.fun.js'
import {
  Types as M,
  DTypes as W,
  DStruct as DS,
  StructFactory,
} from '../../src/index.js'
import { githubPrinterNames } from '../config.unittest.js'
import { CI } from '../root.config.js'


describe(fileShortPath(import.meta.url), () => {

  describe('Should PRINTER_ENUM_LOCAL work ', () => {
    it('normal', async () => {
      const ret = await winspoolEnumPrinters({
        Flags: PrinterEnumFlags.PRINTER_ENUM_LOCAL,
        Level: 4,
      })
      assertsPInfo_4(ret, true)
    })

    it('options<4>', async () => {
      const opts: EnumPrintersOptions<4> = {
        Flags: PrinterEnumFlags.PRINTER_ENUM_LOCAL,
        Level: 4,
      }
      const ret = await winspoolEnumPrinters(opts)
      assertsPInfo_4(ret, false)
    })

    it('options as const', async () => {
      const opts = {
        Flags: PrinterEnumFlags.PRINTER_ENUM_LOCAL,
        Level: 4,
      } as const // <-- `as const`
      const ret = await winspoolEnumPrinters(opts)
      assertsPInfo_4(ret, false)
    })

  })

  describe('Should PRINTER_ENUM_CATEGORY_ALL + PRINTER_ENUM_LOCAL work ', () => {
    it('normal', async () => {
      const ret = await winspoolEnumPrinters({
        Flags: PrinterEnumFlags.PRINTER_ENUM_CATEGORY_ALL | PrinterEnumFlags.PRINTER_ENUM_LOCAL,
        Level: 1,
      })
      assertsPInfo_1(ret, true)
    })

  })
})


function assertsPInfo_1(infos: M.PRINTER_INFO_X[1][], verbose: boolean): void {
  assert(infos.length)

  infos.forEach((info, idx) => {
    assert(info)
    const { pDescription, pName, pComment, Flags } = info
    // assert(info.pPrinterName)
    verbose && console.log({
      idx,
      pDescription,
      pName,
      pComment,
      Flags,
    })
    // if (CI) {
    //   githubPrinterNames.includes(pPrinterName)
    // }
  })
}


function assertsPInfo_4(infos: M.PRINTER_INFO_X[4][], verbose: boolean): void {
  assert(infos.length)

  infos.forEach((info, idx) => {
    assert(info)
    const { pPrinterName, pServerName, Attributes } = info
    assert(info.pPrinterName)
    verbose && console.log({
      idx,
      pPrinterName,
      pServerName,
      Attributes,
    })
    if (CI) {
      githubPrinterNames.includes(pPrinterName)
    }
  })
}
