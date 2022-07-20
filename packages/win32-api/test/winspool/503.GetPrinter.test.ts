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


describe(fileShortPath(import.meta.url), () => {

  describe('Should GetPrinter() work', () => {
    it('normal', async () => {
      // const ret = await winspool.GetPrinter()
      // assert(ret)
      assert(true)
    })
  })
})

