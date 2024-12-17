import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'
import { ucsBufferFrom } from 'win32-def'
import { WNDCLASSEXW_Factory } from 'win32-def/struct'
import type { WNDCLASSEXW_Type } from 'win32-def/struct'

import { Kernel32, User32 as Lib } from '##/index.js'


describe(fileShortPath(import.meta.url), () => {
  const lib = Lib.load()
  assert(lib)
  const libKnl = Kernel32.load()
  assert(libKnl)
  const hModule = libKnl.GetModuleHandleW(null)
  assert(hModule)
  assert(typeof hModule === 'number' || typeof hModule === 'bigint')

  const lpszClassName = 'test-class-' + Date.now().toString()
  const lpszMenuName = 'test-menu-' + Date.now().toString()

  describe('GetClassInfoExW()', () => {
    it('GetClassInfoExW() pass string', () => {
      const { payload } = WNDCLASSEXW_Factory()
      assert(payload.cbSize === 80)
      payload.lpszClassName = lpszClassName
      payload.lpszMenuName = lpszMenuName
      payload.hInstance = hModule
      payload.style = 0x1000

      const atom = lib.RegisterClassExW(payload)
      assert(atom)

      try {
        const { payload: p2 } = WNDCLASSEXW_Factory()
        const ret = lib.GetClassInfoExW(hModule, lpszClassName, p2)
        assert(ret)
        assert(p2.lpszClassName === lpszClassName)
        assert(p2.lpszMenuName === lpszMenuName)
        assert(p2.hInstance === hModule)
        assert(p2.style === 0x1000)
        assert(ret === atom)
      }
      finally {
        lib.UnregisterClassW(atom, 0)
      }
    })

    it('GetClassInfoExW() pass buffer', () => {
      const { payload } = WNDCLASSEXW_Factory()
      assert(payload.cbSize === 80)
      payload.lpszClassName = lpszClassName
      payload.lpszMenuName = lpszMenuName
      payload.hInstance = hModule
      payload.style = 0x1000

      const atom = lib.RegisterClassExW(payload)
      assert(atom)

      try {
        const { payload: p2 } = WNDCLASSEXW_Factory()
        const ret = lib.GetClassInfoExW(hModule, ucsBufferFrom(lpszClassName), p2)
        assert(ret)
        assert(p2.lpszClassName === lpszClassName)
        assert(p2.lpszMenuName === lpszMenuName)
        assert(p2.hInstance === hModule)
        assert(p2.style === 0x1000)
      }
      finally {
        lib.UnregisterClassW(atom, 0)
      }
    })
  })

})

