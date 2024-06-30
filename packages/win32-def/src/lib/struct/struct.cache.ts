import assert from 'node:assert'

import type { StructDetail } from '##/lib/types.js'


export class StructUnionCache {
  static readonly cacheStructMap = new Map<string, StructDetail>()
  static readonly cacheUnionMap = new Map<string, StructDetail>()

  // #region STRUCT

  static getStruct(key: string): StructDetail | undefined {
    assert(key, `key is empty`)
    return StructUnionCache.cacheStructMap.get(key)
  }

  static setStruct(key: string, value: StructDetail): void {
    assert(key, `key is empty`)
    StructUnionCache.cacheStructMap.set(key, value)
  }

  static removeStruct(key: string): boolean {
    assert(key, `key is empty`)
    return StructUnionCache.cacheStructMap.delete(key)
  }

  // #region UNION

  static getUnion(key: string): StructDetail | undefined {
    assert(key, `key is empty`)
    return StructUnionCache.cacheUnionMap.get(key)
  }

  static setUnion(key: string, value: StructDetail): void {
    assert(key, `key is empty`)
    StructUnionCache.cacheUnionMap.set(key, value)
  }

  static removeUnion(key: string): boolean {
    assert(key, `key is empty`)
    return StructUnionCache.cacheUnionMap.delete(key)
  }
}

