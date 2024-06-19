import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'
import ref from 'ref-napi'
import { StructPropToWCHAR } from 'win32-def'
import { PrinterEnumFlags } from 'win32-def/consts'

import {
  winspoolGetDefaultPrinter,
  winspoolOpenPrinter,
  winspoolStartDocPrinter,
  winspoolStartPagePrinter,
  spoolWritePrinter,
  spoolEndDocPrinter,
  winspoolClosePrinter,
  winspoolEndPagePrinter,
} from '../../src/index.fun.js'
import {
  Types as M,
  DTypes as W,
  DStruct as DS,
  StructFactory,
  ucsBufferFrom,
} from '../../src/index.js'
import { CI } from '../root.config.js'


describe(fileShortPath(import.meta.url), () => {

  describe('Should print to Microsoft Print to PDF work ', () => {
    it('pass, but created pdf file size is zero', async () => {
      const pname = await winspoolGetDefaultPrinter()
      assert(pname)
      const hWnd = await winspoolOpenPrinter(pname)
      assert(hWnd)

      const docInfo = StructFactory<M.DOC_INFO_1>(DS.DOC_INFO_1, { useStringBuffer: false })
      docInfo.pDocName = ucsBufferFrom('foo')
      docInfo.pDatatype = ucsBufferFrom('RAW')
      docInfo.pOutputFile = ref.NULL
      const ptr = docInfo.ref()
      const jobId = await winspoolStartDocPrinter(hWnd, ptr)
      assert(jobId)
      console.log({ jobId })

      const r1 = await winspoolStartPagePrinter(hWnd)
      assert(r1)

      const pBuf = ucsBufferFrom('Hello World!')
      const r2 = await spoolWritePrinter(hWnd, pBuf, pBuf.byteLength)
      assert(r2)
      console.log({ r2 })

      const re3 = await winspoolEndPagePrinter(hWnd)
      assert(re3)

      const r4 = await spoolEndDocPrinter(hWnd)
      assert(r4)

      await winspoolClosePrinter(hWnd)
    })


  })

})

