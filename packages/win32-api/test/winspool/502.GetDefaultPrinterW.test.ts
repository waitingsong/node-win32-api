import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'
import ref from 'ref-napi'
import { sleep } from 'zx'

import * as CS from '../../src/index.consts.js'
import {
  DModel as M,
  DTypes as W,
  DStruct as DS,
  StructFactory,
} from '../../src/index.js'
import { winspool } from '../helper.js'
import { CI } from '../root.config.js'


describe(fileShortPath(import.meta.url), () => {

  describe('Should work', () => {
    it('normal', async () => {
      const len = 256
      const pszBuf = Buffer.alloc(len)
      const pcchBuf = Buffer.alloc(4)
      pcchBuf.writeUint32LE(len)
      const ret = await winspool.GetDefaultPrinterW(pszBuf, pcchBuf)
      assert(ret)

      const pcch = pcchBuf.readUInt32LE()
      assert(pcch > 0)
      const size = pcch - 1

      const psz = pszBuf.toString('ucs2', 0, size * 2)
      assert(psz.length > 0)
      console.log({ psz, pcch })

      if (CI) {
        assert(pcch === 23)
        assert(psz === 'Microsoft Print to PDF')
      }
    })
  })
})

