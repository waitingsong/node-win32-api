import assert from 'node:assert'

import { fileShortPath, sleep } from '@waiting/shared-core'

import { DISPLAY_DEVICEW_Factory, POINT_Factory } from '##/index.struct.js'


describe(fileShortPath(import.meta.url), () => {

  describe('DISPLAY_DEVICEW_Factory()', () => {
    it('normal', async () => {
      const { size, payload } = DISPLAY_DEVICEW_Factory()
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

  describe('POINT_Factory()', () => {
    it('normal', async () => {
      const { size, payload } = POINT_Factory()
      // @ts-expect-error cb is not defined
      assert(typeof payload.cb === 'undefined')
    })
  })
})

