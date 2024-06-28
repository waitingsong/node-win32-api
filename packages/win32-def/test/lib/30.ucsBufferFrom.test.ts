import assert from 'node:assert'

import { fileShortPath } from '@waiting/shared-core'

import { ucsBufferFrom } from '##/lib/util.js'


describe(fileShortPath(import.meta.url), () => {
  describe('ucsBufferFrom()', () => {
    it('normal', async () => {
      const str = '联通'
      const buf = ucsBufferFrom(str)
      assert(buf.length === 6)
      assert(buf.byteLength === 6)
    })
  })
})

