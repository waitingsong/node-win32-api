import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { wcharBuffer } from '../src/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('wcharBuffer() should work', () => {
    it('normal', () => {
      const buf = Buffer.alloc(8)
      const deviceName = wcharBuffer(4)
      assert(deviceName)
      assert(typeof deviceName.get === 'function')
      assert(typeof deviceName.set === 'function')
    })

    it('get()', () => {
      const buf = Buffer.alloc(8)
      const deviceName = wcharBuffer(4)
      assert(deviceName)
      const str = deviceName.get(buf, 0)
      assert(str === '')
    })

    it('set()', () => {
      const buf = Buffer.alloc(8)
      const deviceName = wcharBuffer(4)
      assert(deviceName)
      const rnd = Math.random().toString().slice(-2) + '汉'
      deviceName.set(buf, 0, rnd)
      const str = deviceName.get(buf, 0)
      assert(str === rnd)

      const p0 = rnd.codePointAt(0)
      const p1 = rnd.codePointAt(1)
      const p2 = rnd.codePointAt(2)
      assert(buf.readUInt16LE(0) === p0)
      assert(buf.readUInt16LE(2) === p1)
      assert(buf.readUInt16LE(4) === p2)
    })
  })
})

