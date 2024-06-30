import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'
import { WNDCLASSEXW_Factory } from 'win32-def/struct'
import type { WNDCLASSEXW_Type } from 'win32-def/struct'

import { User32 as Lib, Kernel32 } from '##/index.js'


describe(fileShortPath(import.meta.url), () => {
  const lib = Lib.load()
  assert(lib)
  const libKnl = Kernel32.load()
  assert(libKnl)
  const hModule = libKnl.GetModuleHandleW(null)
  assert(hModule)

  const lpszClassName = 'test-class-name-' + Date.now().toString()
  const lpszMenuName = 'test-menu-name-' + Date.now().toString()

  describe('RegisterClassExW()', () => {

    it('no hInstance', () => {
      const { payload } = WNDCLASSEXW_Factory()
      assert(payload.cbSize === 80)
      payload.lpszClassName = lpszClassName
      payload.lpszMenuName = lpszMenuName

      const atom = lib.RegisterClassExW(payload)
      assert(atom)
      lib.UnregisterClassW(atom, 0)
    })

    it('hInstance', () => {
      const { payload } = WNDCLASSEXW_Factory()
      assert(payload.cbSize === 80)
      payload.lpszClassName = lpszClassName
      payload.lpszMenuName = lpszMenuName
      payload.hInstance = hModule

      const atom = lib.RegisterClassExW(payload)
      assert(atom)
      lib.UnregisterClassW(atom, 0)
    })


    it('RegisterClassExW() re-gen', async () => {
      const { payload: p1 } = WNDCLASSEXW_Factory()
      assert(p1.cbSize === 80)
      p1.lpszClassName = lpszClassName
      p1.lpszMenuName = lpszMenuName
      p1.hInstance = hModule

      const atom = lib.RegisterClassExW(p1)
      assert(atom)

      try {
        lib.UnregisterClassW(atom, 0)
        const atom2 = lib.RegisterClassExW(p1)
        assert(atom2)
        try {
          const atom3 = lib.RegisterClassExW(p1)
          assert(! atom3)
        }
        finally {
          lib.UnregisterClassW(atom2, 0)
        }
      }
      finally {
        lib.UnregisterClassW(atom, 0)
      }
    })
  })

})

