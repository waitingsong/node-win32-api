import assert from 'node:assert'

import ffi from 'koffi'

import type { StructDetail, StructInitPlainType } from '##/lib/types.js'

import { StructUnionCache } from './struct.cache.js'


// #region genSimpleStruct()

/**
 * Generate a simple struct
 * - def must has no nested struct or union
 */
export function genSimpleStruct(
  def: StructInitPlainType,
  name?: string,
  pointer?: string,
): StructDetail {

  const key = name ? name.trim() : ''
  let ptr = pointer ?? ''
  if (key && ! ptr) {
    ptr = key + ' *'
  }

  if (key) {
    const data = StructUnionCache.getStruct(key)
    if (data) { return data }
  }

  let ret: StructDetail
  if (key) {
    const type = ffi.struct(key, def)
    const size = ffi.sizeof(type)
    ret = { name: key, pointer: ptr, CType: type, size }
    StructUnionCache.setStruct(key, ret) // cache named struct only
  }
  else {
    const type = ffi.struct(def)
    const size = ffi.sizeof(type)
    ret = { name: key, pointer: ptr, CType: type, size }
  }
  assert(ret, `ret is null or undefined`)

  return ret
}

// #region genSimpleUnion()

export function genSimpleUnion(def: StructInitPlainType, name?: string, pointer?: string): StructDetail {
  const key = name ? name.trim() : ''
  let ptr = pointer ? pointer.trim() : ''
  if (key && ! ptr) {
    ptr = key + ' *'
  }

  if (key) {
    const data = StructUnionCache.getUnion(key)
    if (data) { return data }
  }

  let ret: StructDetail
  if (key) {
    const type = ffi.union(key, def)
    const size = ffi.sizeof(type)
    ret = { name: key, pointer: ptr, CType: type, size }
    StructUnionCache.setUnion(key, ret) // cache named union only
  }
  else {
    const type = ffi.union(def)
    const size = ffi.sizeof(type)
    ret = { name: key, pointer: ptr, CType: type, size }
  }

  return ret
}

