import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'
import { PrinterEnumFlags } from 'win32-def/consts'

import {
  winspoolOpenPrinter,
  winspoolEnumPrinters,
  EnumPrintersOptions,
} from '../../src/index.fun.js'
import {
  DModel as M,
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
      assertsPInfo(ret, true)
    })

    it('options<4>', async () => {
      const opts: EnumPrintersOptions<4> = {
        Flags: PrinterEnumFlags.PRINTER_ENUM_LOCAL,
        Level: 4,
      }
      const ret = await winspoolEnumPrinters(opts)
      assertsPInfo(ret, false)
    })

    it('options as const', async () => {
      const opts = {
        Flags: PrinterEnumFlags.PRINTER_ENUM_LOCAL,
        Level: 4,
      } as const // <-- `as const`
      const ret = await winspoolEnumPrinters(opts)
      assertsPInfo(ret, false)
    })

  })
})


function assertsPInfo(infos: M.PRINTER_INFO_X[4][], verbose: boolean): void {
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

