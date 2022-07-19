import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import {
  POINT,
  RID_DEVICE_INFO,
  StructFactory,
  StructType,
} from '../src/index.js'
import * as DS from '../src/index.struct.js'


describe(fileShortPath(import.meta.url), () => {

  describe('StructType() should work', () => {
    it('normal', () => {
      const rnd = Math.round(Math.random() * 1000000)

      const typeinit = StructType(DS.POINT)
      assert(typeinit)
      const keys = Object.keys(DS.POINT)
      keys.forEach((key) => {
        assert(! Object.hasOwn(typeinit, key))
      })

      const point = new typeinit()
      assert(point)
      point.x = 101
      point.y = rnd

      assert(point.x === 101)
      assert(point.y === rnd)
    })
  })

  describe('StructFactory() should work', () => {
    it('normal', () => {
      const rnd = Math.round(Math.random() * 1000000)
      const point = StructFactory<POINT>(DS.POINT)
      assert(point)
      point.x = 101
      point.y = rnd

      const keys = Object.keys(DS.POINT)
      keys.forEach((key) => {
        assert(typeof point[key] !== undefined)
      })

      assert(point.x === 101)
      assert(point.y === rnd)
    })

    it('with union property', () => {
      const pData = StructFactory<RID_DEVICE_INFO>(DS.RID_DEVICE_INFO)
      assert(pData)
      assert(pData.cbSize === 0)
      pData.cbSize = pData.ref().byteLength
      assert(pData.cbSize > 0)

      const { DUMMYUNIONNAME } = pData
      assert(DUMMYUNIONNAME)
      assert(DUMMYUNIONNAME.hid === 0)
      assert(DUMMYUNIONNAME.mouse === 0)
      assert(DUMMYUNIONNAME.hid === 0)
    })
  })

})

