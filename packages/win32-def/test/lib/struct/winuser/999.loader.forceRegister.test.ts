import assert from 'node:assert'

import { fileShortPath } from '@waiting/shared-core'
import ffi from 'koffi'

import { PrinterEnumFlags } from '##/index.consts.js'
import { LoadOptions, load } from '##/index.js'
import * as S from '##/index.struct.js'
import { Winspool2 as Winspool, DefWinspool2 as DefWinspool } from '#@/def.class/api.helper.js'

// run as last as possible

describe(fileShortPath(import.meta.url), () => {
  const options: LoadOptions<Winspool> = {
    dll: 'winspool.drv',
    dllFuncs: DefWinspool,
    forceRegister: true,
  }

  const flags = PrinterEnumFlags.PRINTER_ENUM_LOCAL
  const pcbNeeded = Buffer.alloc(4)
  const pcReturned = Buffer.alloc(4)

  const cbBuf = 4096
  const buf = Buffer.alloc(cbBuf)

  describe('forceRegister', () => {
    it('EnumPrintersW() after MultipleChoiceMapper', async () => {
      S.PRINTER_INFO_1_Factory()

      const lib = load<Winspool>(options)

      const level = 1
      const name = ''

      const ret = lib.EnumPrintersW(
        flags,
        name,
        level,
        buf,
        cbBuf,
        pcbNeeded,
        pcReturned,
      )
      assert(ret)

      const count = pcReturned.readUInt32LE()

      const decodeType1 = `${S.PRINTER_INFO_1_Name}[${count}]`
      const infoArr = ffi.decode(buf, decodeType1) as S.PRINTER_INFO_1_Type[]

      console.info({ ret, level, infoArr })
    })

  })
})

