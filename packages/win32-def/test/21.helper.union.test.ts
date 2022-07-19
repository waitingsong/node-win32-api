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

      const typeinit = UnionType(DU.RID_DEVICE_INFO_DUMMYUNIONNAME)
      assert(typeinit)
      assert(! Object.hasOwn(typeinit, 'mouse'))
      assert(! Object.hasOwn(typeinit, 'keyboard'))
      assert(! Object.hasOwn(typeinit, 'hid'))

      const DUMMYUNIONNAME = new typeinit() as UT.RID_DEVICE_INFO_DUMMYUNIONNAME
      assert(DUMMYUNIONNAME)
      assert(DUMMYUNIONNAME.mouse === 0)
      assert(DUMMYUNIONNAME.keyboard === 0)
      assert(DUMMYUNIONNAME.hid === 0)
    })
  })

  describe('UnionFactory() should work', () => {
    it('normal', () => {
      const union = UnionFactory<UT.RID_DEVICE_INFO_DUMMYUNIONNAME>(DU.RID_DEVICE_INFO_DUMMYUNIONNAME)
      assert(union)
      assert(union.mouse === 0)
      assert(union.keyboard === 0)
      assert(union.hid === 0)
    })
  })

})

