import assert from 'node:assert'

import { fileShortPath } from '@waiting/shared-core'

import { POINT_Factory, POINT_Type, LPPOINT } from '##/index.struct.js'
import { load } from '##/lib/loader/loader.js'

import { Win32Fns, apiDef } from './21a.helper.js'


describe(fileShortPath(import.meta.url), () => {
  describe('POINT_Factory()', () => {
    it('normal', async () => {
      const { payload } = POINT_Factory()
      assert(payload)
      assert(typeof payload.x === 'undefined')
      assert(typeof payload.y === 'undefined')

      payload.x = 1
      payload.y = 2
      assert(payload.x === 1)
      assert(payload.y === 2)
      void 0
    })

    it('not same', async () => {
      const { payload } = POINT_Factory()
      const { payload: p2 } = POINT_Factory()
      assert(payload !== p2)
    })

    it('not same 2', async () => {
      const { payload } = POINT_Factory()
      assert(payload)
      assert(typeof payload.x === 'undefined')
      assert(typeof payload.y === 'undefined')
      payload.x = 1
      payload.y = 2

      const { payload: p2 } = POINT_Factory()
      assert(typeof p2.x === 'undefined')
      assert(typeof p2.y === 'undefined')

      p2.x = 10
      p2.y = 20
      assert(p2.x === 10)
      assert(p2.y === 20)
      void 0
    })
  })
})

