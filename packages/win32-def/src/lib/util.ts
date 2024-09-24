import assert from 'node:assert'

import ffi from 'koffi'

import type { WCHAR_Array } from './common.types.js'


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

/**
 * Convert a Buffer to string with UCS2 encoding, and remove the last '\0'.
 */
export function ucsBufferToString(input: Buffer, charNum = 0): string {
  // read the last 2 bytes to check if it is '\0'
  const last = input.readUInt16LE(input.length - 2)

  if (charNum > 0) {
    const n2 = input.length / 2
    const offset = Math.min(charNum, n2)
    const txt = input.toString('ucs2', 0, offset * 2)
    // return last === 0 && charNum >= n2 ? txt.slice(0, -1) : txt
    const ret = last === 0 ? txt.replace(/\0+$/u, '') : txt
    return ret
  }

  if (last === 0) { // remove the last '\0'
    return input.toString('ucs2').replace(/\0+$/u, '')
  }
  return input.toString('ucs2')
}


/**
 * Convert a string to Buffer with UCS2 encoding, and append a '\0' at the end.
 */
export function ucsBufferFrom(str: string): Buffer {
  assert(typeof str === 'string', 'str must be a string ')
  return Buffer.from(str + '\0', 'ucs2')
}

