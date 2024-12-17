import assert from 'node:assert'

import { fileShortPath } from '@waiting/shared-core'

import * as D from '##/index.def.js'
import type { StructInitPlainType } from '##/index.js'
import { POINT_Init, genSimpleStruct, genUnion } from '##/index.struct.js'
import { StructUnionCache } from '##/lib/struct/struct.cache.js'


describe(fileShortPath(import.meta.url), () => {
  describe('StructUnionCache', () => {

    it('getStruct', async () => {
      const key = 'POINT-test'
      const info = genSimpleStruct(POINT_Init as StructInitPlainType, key)
      const s1 = StructUnionCache.getStruct(key)
      assert(s1 === info)
    })
    it('removeStruct', async () => {
      const key = 'POINT-test'
      genSimpleStruct(POINT_Init as StructInitPlainType, key)

      StructUnionCache.removeStruct(key)
      const s1 = StructUnionCache.getStruct(key)
      assert(! s1)
    })

    it('getUnion', async () => {
      const u2 = {
        dmDisplayFlags: D.DWORD,
        dmNup: D.DWORD,
      }
      const key = 'uu'
      const ptr = `${key} *` as const
      const info = genUnion(u2, key, ptr)

      const u1 = StructUnionCache.getUnion(key)
      assert(u1 === info)
    })
    it('removeUnion', async () => {
      const expectSize = 4
      const u2 = {
        dmDisplayFlags: D.DWORD,
        dmNup: D.DWORD,
      }
      const key = 'uu'
      const ptr = `${key}*` as const
      genUnion(u2, key, ptr)

      StructUnionCache.removeUnion(key)
      const u1 = StructUnionCache.getUnion(key)
      assert(! u1)
    })

  })
})

