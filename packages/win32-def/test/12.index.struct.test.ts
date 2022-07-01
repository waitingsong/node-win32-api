import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { Def } from '../src/index.def.js'
import { StringBuffer } from '../src/index.js'
import {
  DISPLAY_DEVICEW,
  POINT,

} from '../src/index.struct.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should work', () => {
    it('POINT', () => {
      assert(POINT)
      assert(Object.keys(POINT).length > 0)
      assert(POINT.x === Def.long)
      assert(POINT.y === Def.long)
    })

    it('DISPLAY_DEVICEW', () => {
      assert(DISPLAY_DEVICEW)
      assert(Object.keys(DISPLAY_DEVICEW).length > 0)
      assert(DISPLAY_DEVICEW.cb === Def.uint32)
      assert(typeof DISPLAY_DEVICEW.DeviceName === 'object')
      assert(DISPLAY_DEVICEW.DeviceName.size > 0)
      assert(DISPLAY_DEVICEW.DeviceName.encoding === 'ucs2')
    })
  })

})


