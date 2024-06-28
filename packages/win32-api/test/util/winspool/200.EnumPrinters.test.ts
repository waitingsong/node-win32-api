import assert from 'node:assert/strict'

import { fileShortPath, sleep } from '@waiting/shared-core'
import { PrinterEnumFlags } from 'win32-def/consts'

import { EnumPrinters } from '##/index.util.js'


describe(fileShortPath(import.meta.url), () => {
  describe('EnumPrinters()', () => {
    const needles = [
      'Microsoft XPS Document Writer', 'Microsoft Print to PDF', // Github Actions
      'FAX', '621', // local
    ]

    it('PRINTER_ENUM_LOCAL Level=1', async () => {
      const Level = 1
      const infoArr = await EnumPrinters({
        Flags: PrinterEnumFlags.PRINTER_ENUM_LOCAL,
        Level,
      })
      assert(infoArr)
      console.info({ Level, info: infoArr })

      const match = infoArr.some((info) => {
        return needles.some(needle => info.pName.includes(needle))
      })
      assert(match)
    })

    it('PRINTER_ENUM_LOCAL Level=4', async () => {
      const Level = 4
      const infoArr = await EnumPrinters({
        Flags: PrinterEnumFlags.PRINTER_ENUM_LOCAL,
        Level,
      })
      assert(infoArr)
      console.info({ Level, info: infoArr })

      const match = infoArr.some((info) => {
        return needles.some(needle => info.pPrinterName.includes(needle))
      })
      assert(match)
    })

    it('PRINTER_ENUM_LOCAL Level=5', async () => {
      const Level = 5
      const infoArr = await EnumPrinters({
        Flags: PrinterEnumFlags.PRINTER_ENUM_LOCAL,
        Level,
      })
      assert(infoArr)
      console.info({ Level, info: infoArr })

      const match = infoArr.some((info) => {
        return needles.some(needle => info.pPrinterName.includes(needle))
      })
      assert(match)
    })
  })

})

