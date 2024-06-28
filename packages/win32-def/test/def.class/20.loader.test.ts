import assert from 'node:assert'

import { fileShortPath, isWin32 } from '@waiting/shared-core'

import { CallingConvention, LoadOptions, load } from '##/index.js'
import { POINT_Factory, POINT_Type } from '##/index.struct.js'

import { type Win32, DefWin32Fake, DefWin32 } from './api.helper.js'


describe(fileShortPath(import.meta.url), () => {
  const options: LoadOptions<Win32> = {
    dll: 'user32.dll',
    dllFuncs: DefWin32,
  }

  describe('load()', () => {
    it('normal', async () => {
      if (! isWin32) { return }
      const lib = load<Win32>(options)
      const { payload: pos } = POINT_Factory()

      const res = await lib.GetCursorPos_Async(pos)
      assert(res > 0)
      console.info({ res, pos })
      assert(pos.x >= 0 && pos.y >= 0)
    })

    it('usedFuncNames', async () => {
      if (! isWin32) { return }
      const { payload: pos } = POINT_Factory()
      const lib = load<Win32>({
        ...options,
        usedFuncNames: ['GetCursorPos'],
      })

      const res = lib.GetCursorPos(pos)
      assert(res > 0)
      assert(pos.x >= 0 && pos.y >= 0)

      assert(typeof lib.FindWindowExW === 'undefined')
      assert(typeof lib.FindWindowExW_Async === 'undefined')
    })

    it('usedFuncNames _Async', async () => {
      if (! isWin32) { return }
      const { payload: pos } = POINT_Factory()
      const lib = load<Win32>({
        ...options,
        usedFuncNames: ['GetCursorPos_Async'],
      })

      const res = await lib.GetCursorPos_Async(pos)
      assert(res > 0)
      assert(pos.x >= 0 && pos.y >= 0)

      assert(typeof lib.FindWindowExW === 'undefined')
      assert(typeof lib.FindWindowExW_Async === 'undefined')
    })


    it('sync + async', async () => {
      if (! isWin32) { return }
      const { payload: pos } = POINT_Factory()
      const lib = load<Win32>(options)

      const res = lib.GetCursorPos(pos)
      assert(res > 0)
      assert(pos.x >= 0 && pos.y >= 0)

      const pos2 = {} as POINT_Type
      await lib.GetCursorPos_Async(pos2)
      assert(pos2.x >= 0 && pos2.y >= 0, `pos2.x: ${pos2.x}, pos2.y: ${pos2.y}`)

      assert.deepEqual(pos, pos2)
    })

    it('sync + async with different inst', async () => {
      if (! isWin32) { return }
      const comb = POINT_Factory()
      const pos = comb.payload
      const lib = load<Win32>(options)

      lib.GetCursorPos(pos)
      assert(pos.x >= 0 && pos.y >= 0)

      const lib2 = load<Win32>(options)
      const pos2 = comb.payload
      assert(typeof pos2.x === 'undefined')
      await lib2.GetCursorPos_Async(pos2)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      assert(pos2.x >= 0 && pos2.y >= 0, `pos2.x: ${pos2.x}, pos2.y: ${pos2.y}`)

      assert.deepEqual(pos, pos2)
    })

    it('convention', async () => {
      if (! isWin32) { return }
      const comb = POINT_Factory()
      const pos = comb.payload

      const options2: LoadOptions<Win32> = {
        dll: 'user32.dll',
        dllFuncs: DefWin32,
        convention: CallingConvention.Stdcall,
      }
      const lib = load<Win32>(options2)

      lib.GetCursorPos(pos)
      assert(pos.x >= 0 && pos.y >= 0)

      const lib2 = load<Win32>(options)
      const pos2 = comb.payload
      assert(typeof pos2.x === 'undefined')
      await lib2.GetCursorPos_Async(pos2)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      assert(pos2.x >= 0 && pos2.y >= 0, `pos2.x: ${pos2.x}, pos2.y: ${pos2.y}`)

      assert.deepEqual(pos, pos2)
    })

    it('fake struct in param', async () => {
      if (! isWin32) { return }
      try {
        load({
          ...options,
          dllFuncs: DefWin32Fake,
        })
      }
      catch (ex) {
        assert(ex instanceof Error)
        // console.info('test err:', ex.message)
        assert(ex.message.includes('FAKE_POINT'), ex.message)
        return
      }
      assert(false, 'Should throw Error')
    })
  })
})

