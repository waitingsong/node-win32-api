import assert from 'node:assert'

import { fileShortPath } from '@waiting/shared-core'

import { ucsBufferFrom, ucsBufferToString } from '##/lib/util.js'


describe(fileShortPath(import.meta.url), () => {
  describe('bufferToString()', () => {
    it('normal', async () => {
      const str = '联通'
      const buf = ucsBufferFrom(str)
      const ret = ucsBufferToString(buf)
      assert(ret === str)
    })

    it('charNum=0', async () => {
      const str = '联通'
      const buf = ucsBufferFrom(str)
      const ret = ucsBufferToString(buf, 0)
      assert(ret === str)
    })

    it('charNum=2', async () => {
      const str = '联通'
      const buf = ucsBufferFrom(str)
      const ret = ucsBufferToString(buf, 2)
      assert(ret === str, `"${ret}" !== "${str}"`)
    })

    it('charNum=1', async () => {
      const str = '联通'
      const buf = ucsBufferFrom(str)
      const ret = ucsBufferToString(buf, 1)
      assert(ret === str.slice(0, 1))
    })

    it('charNum=3', async () => {
      const str = '联通'
      const buf = ucsBufferFrom(str)
      const ret = ucsBufferToString(buf, 3)
      assert(ret === str, `ret: "${ret}", str: "${str}"`)
    })

    it('using Buffer contains no \0', async () => {
      const str = '联通'
      const buf = Buffer.from(str, 'ucs2')
      const ret = ucsBufferToString(buf)
      assert(ret === str)
    })

  })
})

