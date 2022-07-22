import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'
import ref from 'ref-napi'
import { sleep } from 'zx'

import * as CS from '../../src/index.consts.js'
import {
  winspoolGetDefaultPrinter,
  winspoolGetPrinter,
  winspoolOpenPrinter,
} from '../../src/index.fun.js'
import {
  DModel as M,
  DTypes as W,
  DStruct as DS,
  StructFactory,
} from '../../src/index.js'
import { CI } from '../root.config.js'


describe(fileShortPath(import.meta.url), () => {

  describe('Should winspoolGetPrinter() work', () => {
    it('Level 1', async () => {
      const pname = await winspoolGetDefaultPrinter()
      assert(pname)
      const hWnd = await winspoolOpenPrinter(pname)
      assert(hWnd)

      const ret = await winspoolGetPrinter(hWnd, 1)
      assert(ret)

      const {
        pDescription,
        pName,
        pComment,
      } = ret
      const desc = pDescription
      const name = pName
      const comment = pComment.toString()
      console.log({ desc, name, comment })
      if (CI) {
        assert(name.includes('Microsoft Print to PDF'))
        assert(comment.includes('Microsoft Print to PDF'))
      }
    })

    it('Level 4', async () => {
      const pname = await winspoolGetDefaultPrinter()
      assert(pname)
      const hWnd = await winspoolOpenPrinter(pname)
      assert(hWnd)

      const ret = await winspoolGetPrinter(hWnd, 4)
      assert(ret)

      const { pPrinterName, pServerName } = ret
      assert(pPrinterName)
      console.log({ pPrinterName, pServerName })
      if (CI) {
        assert(pPrinterName.includes('Microsoft Print to PDF'))
        assert(pServerName === '')
      }
    })
  })
})

