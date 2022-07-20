import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'
import ref from 'ref-napi'
import { sleep } from 'zx'

import * as CS from '../../src/index.consts.js'
import {
  winspoolGetDefaultPrinter,
  winspoolOpenPrinter,
} from '../../src/index.fun.js'
import {
  DModel as M,
  DTypes as W,
  DStruct as DS,
  StructFactory,
} from '../../src/index.js'
import { winspool } from '../helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe('Should work', () => {
    it('normal', async () => {
      const name = await winspoolGetDefaultPrinter()
      assert(name)
      const hWnd = await winspoolOpenPrinter(name)
      assert(hWnd)
    })

    it('fake', async () => {
      const hWnd = await winspoolOpenPrinter(Math.random().toString())
      assert(! hWnd)
    })
  })
})

