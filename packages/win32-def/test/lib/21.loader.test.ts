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

      const res = await inst.GetCursorPosAsync(pos)
      console.info({ res, pos })
      assert(pos.x > 0 && pos.y > 0)
    })
  })
})

