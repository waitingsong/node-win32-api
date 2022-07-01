import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import {
  POINT,
  UnionFactory,
  UnionType,
} from '../src/index.js'
import * as DS from '../src/index.struct.js'
import * as DU from '../src/index.union.js'
import * as UT from '../src/lib/union/union.types.js'


describe(fileShortPath(import.meta.url), () => {

  describe('UnionType() should work', () => {
    it('normal', () => {

      const duInit = UnionType(DU.RID_DEVICE_INFO_DUMMYUNIONNAME)
      assert(duInit)
      assert(! Object.hasOwn(duInit, 'mouse'))
      assert(! Object.hasOwn(duInit, 'keyboard'))
      assert(! Object.hasOwn(duInit, 'hid'))

      const DUMMYUNIONNAME = new duInit() as UT.RID_DEVICE_INFO_DUMMYUNIONNAME
      assert(DUMMYUNIONNAME)
      assert(DUMMYUNIONNAME.mouse === 0)
      assert(DUMMYUNIONNAME.keyboard === 0)
      assert(DUMMYUNIONNAME.hid === 0)
    })
  })

  describe('UnionFactory() should work', () => {
    it('normal', () => {
      const DUMMYUNIONNAME = UnionFactory<UT.RID_DEVICE_INFO_DUMMYUNIONNAME>(DU.RID_DEVICE_INFO_DUMMYUNIONNAME)
      assert(DUMMYUNIONNAME)
      assert(DUMMYUNIONNAME.mouse === 0)
      assert(DUMMYUNIONNAME.keyboard === 0)
      assert(DUMMYUNIONNAME.hid === 0)
    })
  })

})

