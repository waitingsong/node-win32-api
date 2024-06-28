import assert from 'node:assert'

import { fileShortPath } from '@waiting/shared-core'

import { POINT_Factory, POINT_Type, LPPOINT } from '##/index.struct.js'


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
      const comb = POINT_Factory()
      const p1 = comb.payload
      const p2 = comb.payload
      assert(p1 !== p2)

      const { payload: p3 } = comb
      const { payload: p4 } = comb
      assert(p3 !== p4)
      assert(p3 !== p1)
      assert(p3 !== p2)

      p1.x = 1
      assert(typeof p2.x === 'undefined')
      assert(typeof p3.x === 'undefined')
      assert(typeof p4.x === 'undefined')
    })

    it('not same 2', async () => {
      const { payload } = POINT_Factory()
      const { payload: p2 } = POINT_Factory()
      assert(payload !== p2)
    })

    it('not same 3', async () => {
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

    it('re-run', async () => {
      const data = POINT_Factory()
      assert(data)

      const data2 = POINT_Factory()
      assert(data2)
    })
  })
})

