import assert from 'node:assert'

import { fileShortPath } from '@waiting/shared-core'

import { LPPOINT, POINT_Init, genComplexStruct } from '##/index.struct.js'


describe(fileShortPath(import.meta.url), () => {
  describe('genComplexStruct()', () => {
    const expectSize = 8

    it('normal', async () => {
      const key = 'POINT'
      const ptr = `${key}*` as const
      const { name, pointer, CType, size } = genComplexStruct(POINT_Init, key, ptr)

      assert(name === key, `name: ${name}, key: ${key}`)
      assert(pointer === ptr, `pointer: ${pointer}, ptr: ${ptr}`)
      assert(pointer === LPPOINT, `pointer: ${pointer}, LPPOINT: ${LPPOINT}`)
      assert(CType)
      assert(size === expectSize, `size: ${size} !== ${expectSize}`)
    })

    it('pass empty ptr', async () => {
      const key = 'POINT'
      const ptr = ''
      const { name, pointer, CType, size } = genComplexStruct(POINT_Init, key, ptr)

      assert(name === key, `name: ${name}, key: ${key}`)
      assert(pointer === LPPOINT, `pointer: ${pointer}, LPPOINT: ${LPPOINT}`)
      assert(CType)
      assert(size === expectSize, `size: ${size} !== ${expectSize}`)
    })

    it('pass space key,ptr', async () => {
      const key = 'POINT '
      const ptr = '  '
      const { name, pointer, CType, size } = genComplexStruct(POINT_Init, `${key} `, ptr)

      assert(name === key.trim(), `name: "${name}", key: "${key.trim()}"`)
      assert(pointer === LPPOINT, `pointer: ${pointer}, LPPOINT: ${LPPOINT}`)
      assert(CType)
      assert(size === expectSize, `size: ${size} !== ${expectSize}`)
    })

    it('pass no ptr', async () => {
      const key = 'POINT'
      const { name, pointer, CType, size } = genComplexStruct(POINT_Init, key)

      assert(name === key, `name: ${name}, key: ${key}`)
      assert(pointer === LPPOINT, `pointer: ${pointer}, LPPOINT: ${LPPOINT}`)
      assert(CType)
      assert(size === expectSize, `size: ${size} !== ${expectSize}`)
    })

    it('pass no key, ptr', async () => {
      const { name, pointer, CType, size } = genComplexStruct(POINT_Init)

      assert(name === '', `name: ${name}`)
      assert(pointer === '', `pointer: ${pointer}`)
      assert(CType)
      assert(size === expectSize, `size: ${size} !== ${expectSize}`)
    })

    it('cache', async () => {
      const key = 'POINT'
      const ptr = `${key}*` as const
      const info = genComplexStruct(POINT_Init, key, ptr)
      assert(info)
      const { name, pointer, CType, size } = genComplexStruct(POINT_Init, key, 'fake')

      assert(name === key, `name: ${name}, key: ${key}`)
      assert(pointer === ptr, `pointer: ${pointer}, ptr: ${ptr}`)
      assert(pointer === LPPOINT, `pointer: ${pointer}, LPPOINT: ${LPPOINT}`)
      assert(CType)
      assert(size === expectSize, `size: ${size} !== ${expectSize}`)
    })
  })
})

