import assert from 'node:assert'

import { fileShortPath } from '@waiting/shared-core'

import { DISPLAY_DEVICEW_Factory } from '##/index.struct.js'


describe(fileShortPath(import.meta.url), () => {

  describe('DISPLAY_DEVICEW_Factory()', () => {
    it('normal', async () => {
      const { size, payload, sizeColumns } = DISPLAY_DEVICEW_Factory()
      assert(sizeColumns?.length === 1)
      assert(sizeColumns?.[0] === 'cb')
      assert(payload.cb === size)
      try {
        payload.cb = 10
      }
      catch (ex) {
        assert(ex instanceof TypeError)
        assert(ex.message.includes('Cannot assign to read only property'), ex.message)
        assert(ex.message.includes('cb'), ex.message)
        return
      }
      assert(false, 'should throw TypeError')
    })
  })
})

