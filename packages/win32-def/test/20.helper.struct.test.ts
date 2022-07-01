import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import {
  POINT,
  StructFactory,
  StructType,
} from '../src/index.js'
import * as DS from '../src/index.struct.js'


describe(fileShortPath(import.meta.url), () => {

  describe('StructType() should work', () => {
    it('normal', () => {
      const rnd = Math.round(Math.random() * 1000000)

      const poinitInit = StructType(DS.POINT)
      assert(poinitInit)
      assert(! Object.hasOwn(poinitInit, 'x'))
      assert(! Object.hasOwn(poinitInit, 'y'))

      const point = new poinitInit()
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

      assert(point.x === 101)
      assert(point.y === rnd)
    })
  })

})

