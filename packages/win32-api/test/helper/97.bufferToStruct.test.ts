import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'
import ref from 'ref-napi'

import {
  DModel as M,
  DTypes as W,
  DStruct as DS,
  StructFactory,
  ucsBufferFrom,
  bufferToStruct,
} from '../../src/index.js'
import { githubPrinterNames } from '../config.unittest.js'
import { CI } from '../root.config.js'


describe(fileShortPath(import.meta.url), () => {

  describe('Should work ', () => {
    it('useStringBuffer: false', async () => {
      const docInfo = StructFactory<M.DOC_INFO_1>(DS.DOC_INFO_1, { useStringBuffer: false })
      assert(Buffer.isBuffer(docInfo.pDocName))
      docInfo.pDocName = ucsBufferFrom('nodefoo')
      docInfo.pDatatype = ucsBufferFrom('RAW')

      const docInfoBuf = docInfo.ref()
      const arr = bufferToStruct<M.DOC_INFO_1>(docInfoBuf, DS.DOC_INFO_1)
      assert(arr.length === 1)
      const [struct] = arr
      assert(struct)
      assert(struct.pDocName.toString() === 'nodefoo')
      assert(struct.pDatatype.toString() === 'RAW')
      void arr
    })

    it.skip('useStringBuffer: true not support', async () => {
      const name = 'nodefoo'
      const docInfo = StructFactory<M.DOC_INFO_1>(DS.DOC_INFO_1, { useStringBuffer: true, maxCharLength: 16 })
      const docInfo2 = StructFactory<M.DOC_INFO_1>(DS.DOC_INFO_1, { useStringBuffer: false, maxCharLength: 16 })
      // assert(typeof docInfo.pDocName === 'string')
      docInfo.pDocName = ucsBufferFrom(name)
      docInfo.pDatatype = ucsBufferFrom('RAW')

      docInfo2.pDocName = ucsBufferFrom(name)
      docInfo2.pDatatype = ucsBufferFrom('RAW')

      const docInfoBuf = docInfo.ref()
      const docInfoBuf2 = docInfo2.ref()
      const arr = bufferToStruct(docInfoBuf, DS.DOC_INFO_1)
      assert(arr)
      void arr
    })

  })

})

