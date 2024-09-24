import assert from 'node:assert'

import ffi from 'koffi'
import type { IKoffiCType } from 'koffi'

import type {
  StructDetail,
  StructFactoryResult,
  StructInitPlainType,
  StructInitType,
} from '##/lib/types.js'

import { StructUnionCache } from './struct.cache.js'
import { genSimpleStruct, genSimpleUnion } from './struct.simple.helper.js'


// #region genStruct()

/**
 * Generate a complex struct,
 * def can have nested struct or union
 * - key s{number} means struct
 * - key u{number} means union
 */
export function genStruct<T extends object = object>(
  def: StructInitType,
  name?: string,
  pointer?: string,
  sizeColumns?: (keyof T)[],
): StructFactoryResult<T> {

  const struct = genComplexStruct(def, name, pointer) as StructFactoryResult<T> | StructDetail
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


// #region genComplexStruct()

/**
 * Generate a complex struct,
 * def can have nested struct or union
 * - key s{number} means struct
 * - key u{number} means union
 */
export function genComplexStruct(def: StructInitType, name?: string, pointer?: string): StructDetail {
  const key = name ? name.trim() : ''
  const ret = genStructCached(def, key, pointer)
  if (name) {
    assert(ret.name === key, `name: "${ret.name}" !== "${key}"`)
  }
  return ret
}

const regStructName = /^s\d*$/u
const regUnionName = /^u\d*$/u

function genStructCached(def: StructInitType, name: string, pointer: string | undefined): StructDetail {
  if (name) {
    const data = StructUnionCache.getStruct(name)
    if (data) {
      return data
    }
  }
  const data = { ...def }
  // detect nested struct or union, key name start at "s{number*}" means struct, start at "u{number*}" means union
  genItem(data)
  const ret = genSimpleStruct(data as StructInitPlainType, name, pointer)
  return ret
}


// @region genUnion()

export function genUnion(def: StructInitType, name?: string, pointer?: string): StructDetail {
  const key = name ? name.trim() : ''
  let pname = pointer ?? ''
  if (key && ! pname) {
    pname = key + '*'
  }

  const ret = genUnionCached(def, key, pname)
  if (name) {
    assert(ret.name === key, `name: ${ret.name} !== ${key}`)
  }
  return ret
}


function genUnionCached(def: StructInitType, name: string, pointer: string | undefined): StructDetail {
  if (name) {
    const data = StructUnionCache.getUnion(name)
    if (data) {
      return data
    }
  }

  const data = { ...def }
  // detect nested struct or union, key name start at "s{number*}" means struct, start at "u{number*}" means union
  genItem(data)
  const ret = genSimpleUnion(data as StructInitPlainType, name, pointer)
  return ret
}


function genItem(data: StructInitType) {
  // detect nested struct or union, key name start at "s{number*}" means struct, start at "u{number*}" means union
  Object.keys(data).forEach((key) => {
    const value = data[key]
    assert(value, `value of key ${key} is null or undefined`)

    if (typeof value === 'string') { return }

    if (typeof value === 'function') {
      const nested = value() as StructDetail
      assert(nested, `nested struct must be an object, but got ${typeof nested}`)
      data[key] = nested.CType
    }
    else if (typeof value === 'object') {
      // Do not check value, because it can be KoffiCType
      // assert(Object.keys(value).length > 0, `value of key ${key} is empty object`)

      if (regStructName.test(key)) {
        const nested = genComplexStruct(value as StructInitType) // do not pass key
        data[key] = nested.CType
      }
      else if (regUnionName.test(key)) {
        const nested = genUnion(value as StructInitType) // do not pass key
        data[key] = nested.CType
      }
      else if (Object.keys(value).length === 0) {
        return // maybe fix array
      }
      /* c8 ignore next 3 */
      else {
        assert(false, `key ${key} must start with 's' or 'u'`)
      }
    }
    /* c8 ignore next 3 */
    else {
      assert(data[key], `value of key ${key} is null or undefined`)
    }
  })
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

