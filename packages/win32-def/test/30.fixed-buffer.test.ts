import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { wcharBuffer, BufferTypeFactory } from '../src/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('wcharBuffer() should work', () => {
    it('normal', () => {
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
      const len = 32
      const buf = Buffer.alloc(len)
      const deviceName = wcharBuffer(len / 2)
      assert(deviceName)
      const rnd = Math.random().toString().slice(-2) + '汉𠮷'
      deviceName.set(buf, 0, rnd)
      const str = deviceName.get(buf, 0)
      assert(str === rnd)
      assertString(rnd, buf)
    })
  })

  describe('BufferTypeFactory() should work w/o ucs2', () => {
    it('normal', () => {
      const deviceName = BufferTypeFactory(4)
      assert(deviceName)
      assert(typeof deviceName.get === 'function')
      assert(typeof deviceName.set === 'function')
    })

    it('get()', () => {
      const len = 32
      const buf = Buffer.alloc(len)
      const deviceName = BufferTypeFactory(len / 2)
      const size = deviceName.size
      assert(deviceName)

      const buf2 = deviceName.get(buf, 0)
      assert(Buffer.isBuffer(buf2))
      assert(buf2.length === size)

      const buf3 = deviceName.get(buf, 2)
      assert(Buffer.isBuffer(buf3))
      assert(buf3.length === size)
    })

    it('set() string w/o encoding', () => {
      const len = 32
      const buf = Buffer.alloc(len)
      const deviceName = BufferTypeFactory(len / 2)
      assert(deviceName)

      const rnd = Math.random().toString().slice(-2) + '汉'
      try {
        deviceName.set(buf, 0, rnd)
      }
      catch (ex) {
        assert(ex instanceof Error)
        assert(ex.message.includes('BufferType'))
        return
      }
      assert(false, 'should throw error')
    })

    it('set() string with encoding', () => {
      const len = 32
      const buf = Buffer.alloc(len)
      const deviceName = BufferTypeFactory(len / 2)
      assert(deviceName)
      deviceName.encoding = 'ucs2'

      const rnd = Math.random().toString().slice(-2) + '汉𠮷'
      deviceName.set(buf, 0, rnd)
      assert(deviceName)

      const str = deviceName.get(buf, 0)
      assert(str === rnd)
      assertString(rnd, buf)
    })

    it('set() buffer', () => {
      const len = 32
      const buf = Buffer.alloc(len)
      const deviceName = BufferTypeFactory(len / 2)
      assert(deviceName)

      const rnd = Math.random().toString().slice(-2) + '汉𠮷'
      const buf2 = Buffer.from(rnd, 'ucs2')
      deviceName.set(buf, 0, buf2)
      assert(deviceName)

      const buf3 = deviceName.get(buf, 0)
      assert(Buffer.isBuffer(buf3))
      assertString(rnd, buf)
    })
  })
})


function assertString(rnd: string, buf: Buffer): void {
  const p0 = rnd.codePointAt(0)
  const p1 = rnd.codePointAt(1)
  const p2 = rnd.codePointAt(2)
  assert(buf.readUInt16LE(0) === p0)
  assert(buf.readUInt16LE(2) === p1)
  assert(buf.readUInt16LE(4) === p2)

  const p3 = rnd.codePointAt(3)
  if (p3) {
    const p3a = buf.toString('ucs2').slice(3).replace(/\0/ug, '')
    assert(p3a === rnd.slice(3))
  }
}
