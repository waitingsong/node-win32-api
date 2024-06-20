import assert from 'assert'

import ffi from 'koffi'
import type { IKoffiCType } from 'koffi'

import type { KoffiDefComplexType, KoffiDefType, KoffiTypeResult, StructFactoryResult } from './types.js'


const cacheStructMap = new Map<string, KoffiTypeResult>()
const cacheUnionMap = new Map<string, KoffiTypeResult>()


/**
 * Generate a complex struct,
 * def can have nested struct or union
 * - key s{number} means struct
 * - key u{number} means union
 */
export function genStruct<T extends object = object>(
  def: KoffiDefComplexType,
  name?: string,
  pointer?: string,
  sizeColumns?: (keyof T)[],
): StructFactoryResult<T> {

  const struct = genComplexStruct(def, name, pointer) as StructFactoryResult<T> | KoffiTypeResult
  bindPayloadGetter(struct as StructFactoryResult, sizeColumns)
  return struct as StructFactoryResult<T>
}

function bindPayloadGetter(struct: StructFactoryResult, sizeColumns: PropertyKey[] | undefined): void {
  if (typeof struct.sizeColumns === 'undefined') {
    Object.defineProperty(struct, 'sizeColumns', {
      enumerable: true,
      writable: false,
      value: sizeColumns,
    })
  }

  if (typeof struct.payload === 'undefined') {
    // payload must be the new one after each call of the struct factory function
    Object.defineProperty(struct, 'payload', {
      get: function (this: StructFactoryResult) {
        if (! this.sizeColumns?.length) {
          return {}
        }

        const ret = {}
        this.sizeColumns.forEach((key) => {
          if (key) {
            Object.defineProperty(ret, key, {
              enumerable: true,
              writable: false,
              value: this.size,
            })
          }
        })
        return ret
      },
    })
  }

}

/**
 * Generate a simple struct
 * - def must has no nested struct or union
 */
export function genSimpleStruct(
  def: KoffiDefType,
  name?: string,
  pointer?: string,
): KoffiTypeResult {

  const key = name ? name.trim() : ''
  let pname = pointer ?? ''
  if (key && ! pname) {
    pname = key + ' *'
  }
  return genSimpleStructCached(def, key, pname)
}

function genSimpleStructCached(def: KoffiDefType, name: string, pointer: string): KoffiTypeResult {
  if (name) {
    const data = cacheStructMap.get(name)
    if (data) { return data }
  }

  let ret
  if (name) {
    const type = ffi.struct(name, def)
    const size = ffi.sizeof(type)
    ret = { name, pointer, CType: type, size }
    cacheStructMap.set(name, ret) // cache named struct only
  }
  else {
    const type = ffi.struct(def)
    const size = ffi.sizeof(type)
    ret = { name, pointer, CType: type, size }
  }

  return ret
}


export function genSimpleUnion(def: KoffiDefType, name?: string, pointer?: string): KoffiTypeResult {
  const key = name ? name.trim() : ''
  let pname = pointer ?? ''
  if (key && ! pname) {
    pname = key + ' *'
  }
  return genSimpleUnionCached(def, key, pname)
}


function genSimpleUnionCached(def: KoffiDefType, name: string, pointer: string): KoffiTypeResult {
  if (name) {
    const data = cacheUnionMap.get(name)
    if (data) { return data }
  }

  let ret
  if (name) {
    const type = ffi.union(name, def)
    const size = ffi.sizeof(type)
    ret = { name, pointer, CType: type, size }
    cacheUnionMap.set(name, ret) // cache named union only
  }
  else {
    const type = ffi.union(def)
    const size = ffi.sizeof(type)
    ret = { name, pointer, CType: type, size }
  }

  return ret
}

// #region genStruct()

/**
 * Generate a complex struct,
 * def can have nested struct or union
 * - key s{number} means struct
 * - key u{number} means union
 */
export function genComplexStruct(def: KoffiDefComplexType, name?: string, pointer?: string): KoffiTypeResult {
  const key = name ? name.trim() : ''
  let pname = pointer ?? ''
  if (key && ! pname) {
    pname = key + ' *'
  }
  const ret = genStructCached(def, key, pname)
  if (name) {
    assert(ret.name === name, `name: ${ret.name} !== ${name}`)
  }
  return ret
}

const regStructName = /^s\d*$/u
const regUnionName = /^u\d*$/u

function genStructCached(def: KoffiDefComplexType, name: string, pointer: string): KoffiTypeResult {
  if (name) {
    const data = cacheStructMap.get(name)
    if (data) {
      return data
    }
  }
  const data = {
    ...def,
  }

  // detect nested struct or union, key name start at "s{number*}" means struct, start at "u{number*}" means union
  Object.keys(data).forEach((key) => {

    const value = data[key]
    assert(value, `value of key ${key} is null or undefined`)

    if (typeof value === 'string') { return }

    if (typeof value === 'function') {
      const nested = value() as KoffiTypeResult
      assert(nested, `nested struct must be an object, but got ${typeof nested}`)
      data[key] = nested.CType
    }
    else if (typeof value === 'object') {
      if (regStructName.test(key)) {
        const nested = genComplexStruct(value as KoffiDefComplexType) // do not pass key
        data[key] = nested.CType
      }
      else if (regUnionName.test(key)) {
        const nested = genUnion(value as KoffiDefType) // do not pass key
        data[key] = nested.CType
      }
      else if (Object.keys(value).length === 0) {
        return // maybe fix array
      }
      else {
        assert(false, `key ${key} must start with 's' or 'u'`)
      }
    }
    else {
      assert(data[key], `value of key ${key} is null or undefined`)
    }
  })

  const ret = genSimpleStruct(data as KoffiDefType, name, pointer)
  return ret
}

// @region genUnion()

export function genUnion(def: KoffiDefType, name?: string, pointer?: string): KoffiTypeResult {
  const key = name ? name.trim() : ''
  let pname = pointer ?? ''
  if (key && ! pname) {
    pname = key + ' *'
  }

  const ret = genUnionCached(def, key, pname)
  if (name) {
    assert(ret.name === name, `name: ${ret.name} !== ${name}`)
  }
  return ret
}


function genUnionCached(def: KoffiDefType, name: string, pointer: string): KoffiTypeResult {
  if (name) {
    const data = cacheUnionMap.get(name)
    if (data) {
      return data
    }
  }

  const data = {
    ...def,
  }

  // detect nested struct or union, key name start at "s{number*}" means struct, start at "u{number*}" means union
  Object.keys(data).forEach((key) => {
    const value = data[key]
    assert(value, `value of key ${key} is null or undefined`)

    if (typeof value === 'string') { return }

    if (typeof value === 'function') {
      // @ts-expect-error factory function of struct or union
      const nested = value() as KoffiTypeResult
      assert(nested, `nested struct must be an object, but got ${typeof nested}`)
      data[key] = nested.CType
    }
    else if (typeof value === 'object') {
      if (regStructName.test(key)) {
        // @ts-expect-error
        const nested = genComplexStruct(value) // do not pass key
        data[key] = nested.CType
      }
      else if (regUnionName.test(key)) {
        // @ts-expect-error
        const nested = genUnion(value) // do not pass key
        data[key] = nested.CType
      }
      else if (Object.keys(value).length === 0) {
        return // maybe fix array
      }
      else {
        assert(false, `key ${key} must start with 's' or 'u'`)
      }
    }
    else {
      assert(data[key], `value of key ${key} is null or undefined`)
    }
  })

  const ret = genSimpleUnion(data, name, pointer)
  return ret
}


/**
 * Generate a fixed int16_t array.
 * convert it back to string through decodeInt16Array()
 */
export function genFixedInt16Array(length: number): IKoffiCType {
  assert(length > 0, `length must be greater than 0, but got ${length}`)
  const type = ffi.array('int16_t', length)
  return type
}

export function genFixedArray(length: number): IKoffiCType {
  assert(length > 0, `length must be greater than 0, but got ${length}`)
  const type = ffi.array('int16_t', length, 'Array')
  return type
}

