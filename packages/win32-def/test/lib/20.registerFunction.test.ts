import assert from 'node:assert'

import { fileShortPath } from '@waiting/shared-core'
import ffi from 'koffi'

import { POINT_Factory, POINT_Type } from '##/index.struct.js'
import { registerFunction } from '##/lib/loader/loader.helper.js'


describe(fileShortPath(import.meta.url), () => {
  describe('registerFunction()', () => {
    it('normal', async () => {
      const user32 = ffi.load('user32.dll')

      const comb = POINT_Factory()
      const pos = {} as POINT_Type

      try {
        const func = registerFunction({
          lib: user32,
          name: 'GetCursorPos',
          params: ['int', [`_Out_ ${comb.pointer}`]],
        })
        console.info(func.info)

        const res = func(pos) as number
        console.info({ res, pos })
        assert(pos.x > 0 && pos.y > 0)
      }
      finally {
        user32.unload()
      }
    })
  })
})

