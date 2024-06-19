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
      assert(res > 0)
      console.info({ res, pos })
      assert(pos.x > 0 && pos.y > 0)

      // Do NOT call unload() on Windows
      // inst.unload()
    })

    it('sync + async', async () => {
      POINT_Factory()
      const pos = {} as POINT_Type

      const inst = load<Win32Fns>({
        dll: 'user32.dll',
        dllFuncs: apiDef,
        // usedFuncNames: ['GetCursorPos'],
      })

      const res = inst.GetCursorPos(pos)
      assert(res > 0)
      assert(pos.x > 0 && pos.y > 0)

      const pos2 = {} as POINT_Type
      await inst.GetCursorPosAsync(pos2)
      assert(pos2.x > 0 && pos2.y > 0, `pos2.x: ${pos2.x}, pos2.y: ${pos2.y}`)

      assert.deepEqual(pos, pos2)
    })

    it('sync + async with different inst', async () => {
      POINT_Factory()
      const pos = {} as POINT_Type

      const inst = load<Win32Fns>({
        dll: 'user32.dll',
        dllFuncs: apiDef,
      })

      inst.GetCursorPos(pos)
      assert(pos.x > 0 && pos.y > 0)

      const inst2 = load<Win32Fns>({
        dll: 'user32.dll',
        dllFuncs: apiDef,
      })

      const pos2 = {} as POINT_Type
      await inst2.GetCursorPosAsync(pos2)
      assert(pos2.x > 0 && pos2.y > 0, `pos2.x: ${pos2.x}, pos2.y: ${pos2.y}`)

      assert.deepEqual(pos, pos2)
    })
  })
})

