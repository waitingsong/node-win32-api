import assert from 'node:assert'

import { fileShortPath } from '@waiting/shared-core'
import ffi from 'koffi'

import * as D from '##/index.def.js'
import { DllFuncs, LoadOptions } from '##/index.js'
import * as T from '##/index.js'
import { POINT_Factory, POINT_Type, LPPOINT } from '##/index.struct.js'
import { load } from '##/lib/loader/loader.js'

import { type Win32Fns, apiDef } from './21a.helper.js'



describe(fileShortPath(import.meta.url), () => {
  const options: LoadOptions<Win32Fns> = {
    dll: 'user32.dll',
    dllFuncs: apiDef,
  }

  describe('registerFunction()', () => {
    it('normal', async () => {
      const { payload: pos } = POINT_Factory()
      const lib = load<Win32Fns>(options)

      const res = lib.GetCursorPos(pos)
      assert(res > 0)
      console.info({ res, pos })
      assert(pos.x > 0 && pos.y > 0)

      // Do NOT call unload() on Windows
      // inst.unload()
    })

    it('usedFuncNames', async () => {
      const { payload: pos } = POINT_Factory()
      const lib = load<Win32Fns>({
        ...options,
        usedFuncNames: ['GetCursorPos'],
      })

      const res = lib.GetCursorPos(pos)
      assert(res > 0)
      console.info({ res, pos })
      assert(pos.x > 0 && pos.y > 0)

      assert(typeof lib.FindWindowExW === 'undefined')
      assert(typeof lib.FindWindowExWAsync === 'undefined')
    })

    it('sync + async', async () => {
      const { payload: pos } = POINT_Factory()
      const lib = load<Win32Fns>(options)

      const res = lib.GetCursorPos(pos)
      assert(res > 0)
      assert(pos.x > 0 && pos.y > 0)

      const pos2 = {} as POINT_Type
      await lib.GetCursorPosAsync(pos2)
      assert(pos2.x > 0 && pos2.y > 0, `pos2.x: ${pos2.x}, pos2.y: ${pos2.y}`)

      assert.deepEqual(pos, pos2)
    })

    it('sync + async with different inst', async () => {
      const comb = POINT_Factory()
      const pos = comb.payload
      const lib = load<Win32Fns>(options)

      lib.GetCursorPos(pos)
      assert(pos.x > 0 && pos.y > 0)

      const lib2 = load<Win32Fns>(options)
      const pos2 = comb.payload
      assert(typeof pos2.x === 'undefined')
      await lib2.GetCursorPosAsync(pos2)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      assert(pos2.x > 0 && pos2.y > 0, `pos2.x: ${pos2.x}, pos2.y: ${pos2.y}`)

      assert.deepEqual(pos, pos2)
    })
  })
})

