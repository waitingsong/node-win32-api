import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import {
  winspoolGetDefaultPrinter,
  winspoolGetPrinter,
  winspoolOpenPrinter,
} from '../../src/index.fun.js'
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
        Flags,
        pDescription,
        pName,
        pComment,
      } = ret
      const desc = pDescription
      const name = pName
      const comment = pComment.toString()

      assert(typeof Flags === 'number')
      // assert(Flags === 576)

      assert(typeof pDescription === 'string')
      assert(typeof pName === 'string')
      assert(typeof pComment === 'string')

      console.log({ desc, name, comment })
      if (CI) {
        assert(name.includes('Microsoft Print to PDF'))
        assert(desc.includes('Microsoft Print to PDF'))
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

