import assert from 'assert'

import ffi from 'koffi'

import { WCHAR_Array } from './common.types.js'



export function decodeInt16Array(input: WCHAR_Array, length = -1): string {
  assert(input, 'input must be an object')
  assert(typeof input.buffer === 'object', 'input.buffer must be an object')
  assert(typeof input.byteLength === 'number', 'input.byteLength must be a number')
  assert(typeof input.byteOffset === 'number', 'input.byteOffset must be a number')
  assert(typeof input.length === 'number', 'input.length must be a number')
  // const str = Buffer.from(input.buffer).toString('ucs2')
  // return str
  const str = ffi.decode(input, 'char16_t', length) as string
  return str || ''
}

export function bufferToString(input: Buffer, charNum = 0): string {
  return charNum > 0 ? input.toString('ucs2', 0, charNum * 2) : input.toString('ucs2')
}


export function ucsBufferFrom(str: string): Buffer {
  assert(typeof str === 'string', 'str must be a string ')
  return Buffer.from(str + '\0', 'ucs2')
}

