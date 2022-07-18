import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'

import { fileShortPath } from '@waiting/shared-core'
import ref from 'ref-napi'
import { sleep } from 'zx'

// import * as CS from '../../src/index.consts.js'
import {
  DModel as M,
  DTypes as W,
  DStruct as DS,
  StructFactory,
} from '../../src/index.js'
import { user32 } from '../helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe('Should GetCaretPos() work', () => {
    it('true', async () => {
      const point = StructFactory<M.POINT>(DS.POINT)
      const ret = await user32.GetCaretPos(point.ref())
      assert(ret > 0)
      console.log({ x: point.x, y: point.y })
    })
  })
})

