import assert from 'node:assert'

import { fileShortPath, isWin32 } from '@waiting/shared-core'

import { PrinterEnumFlags } from '##/index.consts.js'
import { load } from '##/index.js'
import { PRINTER_INFO_1_Type, PRINTER_INFO_4_Type } from '##/index.struct.js'
import { multipleChoiceMapperList } from '#@/mapper/index.mapper.js'
import { expectPrinterInfo } from '#@/test.config.js'

import { defWinspool, WinspoolFns } from './api.helper.js'


describe(fileShortPath(import.meta.url), () => {
  const flags = PrinterEnumFlags.PRINTER_ENUM_LOCAL
  const name = ''
  const cbBuf = 4096
  assert(cbBuf > 2, 'cbBuf must be > 2')
  const pcbNeeded = Buffer.alloc(4)
  const pcReturned = Buffer.alloc(4)
  const printerInfo1 = {} as PRINTER_INFO_1_Type
  const printerInfo4 = {} as PRINTER_INFO_4_Type

  describe('load()', () => {
    it('using Map', async () => {
      if (! isWin32) { return }
      const lib = load<WinspoolFns>({
        dll: 'winspool.drv',
        dllFuncs: defWinspool,
        // multipleChoiceMapperList: multipleChoiceMapperList, // using lib.updateMultipleChoiceMapper() method instead
      })
      lib.updateMultipleChoiceMapper({ mapperList: multipleChoiceMapperList })

      const ret1 = await lib.EnumPrintersW_Async(
        flags,
        name,
        1,
        printerInfo1,
        cbBuf,
        pcbNeeded,
        pcReturned,
      )
      console.log({ ret1, printerInfo1 })
      assert(ret1, 'EnumPrintersW(PRINTER_INFO_1) failed')
      assert(printerInfo1.pName === expectPrinterInfo.name)
      assert(printerInfo1.pDescription.includes(expectPrinterInfo.name))
      assert(printerInfo1.pComment === '')
      assert(printerInfo1.Flags === expectPrinterInfo.flags)

      const ret4 = lib.EnumPrintersW(
        flags,
        name,
        4,
        printerInfo4,
        cbBuf,
        pcbNeeded,
        pcReturned,
      )
      console.log({ ret4, printerInfo4 })
      assert(ret4, 'EnumPrintersW(PRINTER_INFO_4) failed')

      assert(printerInfo4.pPrinterName === expectPrinterInfo.name)
      assert(printerInfo4.pServerName === null)
      assert(printerInfo4.Attributes === 576)
    })
  })
})

