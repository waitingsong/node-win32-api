import assert from 'node:assert'

import { fileShortPath } from '@waiting/shared-core'
import ffi from 'koffi'

import * as D from '##/index.def.js'
import { DllFuncs } from '##/index.js'
import * as T from '##/index.js'
import { POINT_Factory, POINT_Type, LPPOINT } from '##/index.struct.js'
import { load } from '##/lib/loader/loader.js'

import { Win32Fns, apiDef } from './21a.helper.js'



describe(fileShortPath(import.meta.url), () => {
  describe('registerFunction()', () => {
    it('normal', async () => {
      POINT_Factory()
      const pos = {} as POINT_Type

      const inst = load<Win32Fns>({
        dll: 'user32.dll',
        dllFuncs: apiDef,
        // usedFuncNames: ['GetCursorPos'],
      })

      const res = inst.GetCursorPos(pos)
      console.info({ res, pos })
      assert(pos.x > 0 && pos.y > 0)

      const pos2 = {} as POINT_Type
      const res2 = await inst.GetCursorPosAsync(pos2)
      console.info({ res2, pos2 })
      assert(pos2.x > 0 && pos2.y > 0)

      assert.deepEqual(pos, pos2)
    })
  })
})

