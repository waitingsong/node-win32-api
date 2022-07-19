import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import {
  ALTTABINFO,
  StructFactory,
  StructType,
} from '../../src/index.js'
import * as DS from '../../src/index.struct.js'


describe(fileShortPath(import.meta.url), () => {

  describe('ALTTABINFO should work', () => {
    it('StructType()', () => {
      const rnd = Math.round(Math.random() * 1000000)

      const typeinit = StructType(DS.ALTTABINFO)
      assert(typeinit)

      const keys = Object.keys(DS.ALTTABINFO)
      keys.forEach((key) => {
        assert(! Object.hasOwn(typeinit, key))
      })

      const struct = new typeinit() as unknown as ALTTABINFO
      assert(struct)
      keys.forEach((key) => {
        assert(typeof struct[key] !== undefined)
      })

      const len = struct.ref().byteLength
      struct.cbSize = len
      assert(struct.cbSize === len)
    })

    it('StructFactory()', () => {
      const struct = StructFactory<ALTTABINFO>(DS.ALTTABINFO)
      assert(struct)

      const keys = Object.keys(struct)
      keys.forEach((key) => {
        assert(typeof struct[key] !== undefined)
      })

      const len = struct.ref().byteLength
      struct.cbSize = len
      assert(struct.cbSize === len)
    })
  })
})

