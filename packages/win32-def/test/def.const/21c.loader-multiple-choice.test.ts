import assert from 'node:assert'

import { fileShortPath } from '@waiting/shared-core'

import { PrinterEnumFlags } from '##/index.consts.js'
import { CallingConvention, load } from '##/index.js'
import type {
  PRINTER_INFO_1_Type,
  PRINTER_INFO_4_Type,
  PRINTER_INFO_5_Type,
} from '##/index.struct.js'
import { multipleChoiceMapperList, multipleChoiceMapperSet } from '#@/mapper/index.mapper.js'
import { expectPrinterInfo } from '#@/test.config.js'

import { defWinspool } from './api.helper.js'
import type { WinspoolFns } from './api.helper.js'


describe(fileShortPath(import.meta.url), () => {
  const flags = PrinterEnumFlags.PRINTER_ENUM_LOCAL
  const name = ''
  const cbBuf = 4096
  assert(cbBuf > 2, 'cbBuf must be > 2')
  const pcbNeeded = Buffer.alloc(4)
  const pcReturned = Buffer.alloc(4)

  describe('load()', () => {
    it('using Map (before)', async () => {
      const lib = load<WinspoolFns>({
        dll: 'winspool.drv',
        dllFuncs: defWinspool,
        // multipleChoiceMapperList: multipleChoiceMapperList, // using lib.updateMultipleChoiceMapper() method instead
      })
      lib.updateMultipleChoiceMapper({ mapperList: multipleChoiceMapperList })

      const level = 1
      const printerInfo = {} as PRINTER_INFO_1_Type

      const ret = await lib.EnumPrintersW_Async(
        flags,
        name,
        level,
        printerInfo,
        cbBuf,
        pcbNeeded,
        pcReturned,
      )
      assert(ret, 'EnumPrintersW(PRINTER_INFO_1) failed')
      assert(printerInfo.pName === expectPrinterInfo.name)
      assert(printerInfo.pDescription.includes(expectPrinterInfo.name))
      assert(printerInfo.pComment === '')
      assert(printerInfo.Flags === expectPrinterInfo.flags)
    })

    it('using fnName+Map (before)', async () => {
      const lib = load<WinspoolFns>({
        dll: 'winspool.drv',
        dllFuncs: defWinspool,
        // multipleChoiceMapperList: multipleChoiceMapperList, // using lib.updateMultipleChoiceMapper() method instead
      })
      lib.updateMultipleChoiceMapper({
        fnName: 'EnumPrintersW',
        mapperSet: multipleChoiceMapperSet,
      })

      const level = 1
      const printerInfo = {} as PRINTER_INFO_1_Type

      const ret = await lib.EnumPrintersW_Async(
        flags,
        name,
        level,
        printerInfo,
        cbBuf,
        pcbNeeded,
        pcReturned,
      )
      assert(ret, 'EnumPrintersW(PRINTER_INFO_1) failed')
      assert(printerInfo.pName === expectPrinterInfo.name)
      assert(printerInfo.pDescription.includes(expectPrinterInfo.name))
      assert(printerInfo.pComment === '')
      assert(printerInfo.Flags === expectPrinterInfo.flags)
    })

    it('multi params Level=1', async () => {
      const lib = load<WinspoolFns>({
        dll: 'winspool.drv',
        dllFuncs: defWinspool,
        multipleChoiceMapperList: multipleChoiceMapperList,
      })

      const level = 1
      const printerInfo = {} as PRINTER_INFO_1_Type

      const ret = await lib.EnumPrintersW_Async(
        flags,
        name,
        level,
        printerInfo,
        cbBuf,
        pcbNeeded,
        pcReturned,
      )
      console.log({ ret, level, printerInfo })
      assert(ret, 'EnumPrintersW(PRINTER_INFO_1) failed')
      assert(printerInfo.pName === expectPrinterInfo.name)
      assert(printerInfo.pDescription.includes(expectPrinterInfo.name))
      assert(printerInfo.pComment === '')
      assert(printerInfo.Flags === expectPrinterInfo.flags)
    })

    it('multi params Level=4', async () => {
      const lib = load<WinspoolFns>({
        dll: 'winspool.drv',
        dllFuncs: defWinspool,
        multipleChoiceMapperList: multipleChoiceMapperList,
      })

      const level = 4
      const printerInfo = {} as PRINTER_INFO_4_Type

      const ret = lib.EnumPrintersW(
        flags,
        name,
        level,
        printerInfo,
        cbBuf,
        pcbNeeded,
        pcReturned,
      )
      console.log({ ret, level, printerInfo })
      assert(ret, 'EnumPrintersW(PRINTER_INFO_4) failed')

      assert(printerInfo.pPrinterName === expectPrinterInfo.name)
      assert(printerInfo.pServerName === null)
      assert(printerInfo.Attributes === 576)
    })

    it('multi params Level=5', async () => {
      const lib = load<WinspoolFns>({
        dll: 'winspool.drv',
        dllFuncs: defWinspool,
        multipleChoiceMapperList: multipleChoiceMapperList,
      })

      const level = 5
      const printerInfo = {} as PRINTER_INFO_5_Type

      const ret = await lib.EnumPrintersW_Async(
        flags,
        name,
        level,
        printerInfo,
        cbBuf,
        pcbNeeded,
        pcReturned,
      )
      console.log({ ret, level, printerInfo })
      assert(ret, 'EnumPrintersW(PRINTER_INFO_5) failed')

      assert(printerInfo.pPrinterName === expectPrinterInfo.name)
      assert(printerInfo.pPortName === 'PORTPROMPT:')
      assert(printerInfo.Attributes === 576)
      assert(printerInfo.DeviceNotSelectedTimeout === 45000)
      assert(printerInfo.TransmissionRetryTimeout === 45000)
    })

    it('multi params Level=2(not support)', async () => {
      const lib = load<WinspoolFns>({
        dll: 'winspool.drv',
        dllFuncs: defWinspool,
        multipleChoiceMapperList: multipleChoiceMapperList,
      })

      const level = 2
      const printerInfo = {} as PRINTER_INFO_5_Type

      try {
        await lib.EnumPrintersW_Async(
          flags,
          name,
          // @ts-expect-error test invalid level
          level,
          printerInfo,
          cbBuf,
          pcbNeeded,
          pcReturned,
        )
      }
      catch (ex) {
        assert(ex instanceof Error)
        assert(ex.message.includes('level not supported'))
        assert(ex.message.includes(level.toString()))
        return
      }
      assert(false, 'should throw Error')
    })

    it('multi params Level=999(invalid)', async () => {
      const lib = load<WinspoolFns>({
        dll: 'winspool.drv',
        dllFuncs: defWinspool,
        multipleChoiceMapperList: multipleChoiceMapperList,
      })

      const level = 999
      const printerInfo = {} as PRINTER_INFO_5_Type

      try {
        await lib.EnumPrintersW_Async(
          flags,
          name,
          // @ts-expect-error test invalid level
          level,
          printerInfo,
          cbBuf,
          pcbNeeded,
          pcReturned,
        )
      }
      catch (ex) {
        assert(ex instanceof Error)
        assert(ex.message.includes('level not supported'))
        assert(ex.message.includes(level.toString()))
        return
      }
      assert(false, 'should throw Error')
    })

    it('multi params invalid param', async () => {
      const lib = load<WinspoolFns>({
        dll: 'winspool.drv',
        dllFuncs: defWinspool,
        multipleChoiceMapperList: multipleChoiceMapperList,
        convention: CallingConvention.Cdecl,
      })

      const level = 4

      try {
        await lib.EnumPrintersW_Async(
          flags,
          name,
          level,
          // @ts-expect-error test invalid param
          'fake',
          cbBuf,
          pcbNeeded,
          pcReturned,
        )
      }
      catch (ex) {
        assert(ex instanceof Error)
        assert(ex.message.includes('Unexpected String value, expected PRINTER_INFO_4 *'))
        return
      }
      assert(false, 'should throw Error')
    })
  })
})

