import assert from 'node:assert'

import { fileShortPath } from '@waiting/shared-core'

import * as D from '##/index.def.js'
import { genUnion } from '##/index.struct.js'


describe(fileShortPath(import.meta.url), () => {
  describe('genUnion()', () => {
    const expectSize = 4
    const u2 = {
      dmDisplayFlags: D.DWORD,
      dmNup: D.DWORD,
    }

    it('normal', async () => {
      const key = 'uu'
      const ptr = `${key}*` as const
      const { name, pointer, CType, size } = genUnion(u2, key, ptr)

      assert(name === key, `name: ${name}, key: ${key}`)
      assert(pointer === ptr, `pointer: ${pointer}, ptr: ${ptr}`)
      assert(CType)
      assert(size === expectSize, `size: ${size} !== ${expectSize}`)
    })

    it('pass empty ptr', async () => {
      const key = 'uu1'
      const ptr = ''
      const { name, pointer, CType, size } = genUnion(u2, key, ptr)

      assert(name === key, `name: ${name}, key: ${key}`)
      assert(pointer === `${key}*`)
      assert(CType)
      assert(size === expectSize, `size: ${size} !== ${expectSize}`)
    })

    it('pass space key,ptr', async () => {
      const key = 'uu1 '
      const ptr = '  '
      const { name, pointer, CType, size } = genUnion(u2, key, ptr)

      assert(name === key.trim(), `name: ${name}, key: "${key}"`)
      assert(pointer === `${key.trim()}*`, `pointer: ${pointer}, key: "${key.trim()}*"`)
      assert(CType)
      assert(size === expectSize, `size: ${size} !== ${expectSize}`)
    })

    it('pass no ptr', async () => {
      const key = 'uu2'
      const { name, pointer, CType, size } = genUnion(u2, key)

      assert(name === key, `name: ${name}, key: ${key}`)
      assert(pointer === `${key}*`, `pointer: ${pointer}, key: "${key}*"`)
      assert(CType)
      assert(size === expectSize, `size: ${size} !== ${expectSize}`)
    })

    it('cache', async () => {
      const key = 'uu2'
      const ptr = `${key}*` as const
      const info = genUnion(u2, key, ptr)
      assert(info)

      const { name, pointer, CType, size } = genUnion(u2, key, 'fake')

      assert(name === key, `name: ${name}, key: ${key}`)
      assert(pointer === ptr, `pointer: ${pointer}, ptr: ${ptr}`)
      assert(CType)
      assert(size === expectSize, `size: ${size} !== ${expectSize}`)
    })
  })
})

