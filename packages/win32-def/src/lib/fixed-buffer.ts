import assert from 'assert'

// eslint-disable-next-line import/no-extraneous-dependencies
import { types } from 'ref-napi'

import { StringBuffer } from './common.types.js'

/**
 * Fixed length "Buffer" type, for use in Struct type definitions.
 * Like `wchar Name[32]` in C,
 * `getter` and `setter` functions are provided to access the buffer contents.
 * The starting and tailing terminal-null of returned string via `getter` is removed.
 */
export function wcharBuffer(charLength: number): StringBuffer {
  assert(charLength >= 0)
  return BufferTypeFactory(charLength * 2, 'ucs2')
}


/**
 * Fixed length "Buffer" type, for use in Struct type definitions.
 *
 * Optionally setting the `encoding` param will force to call
 * `toString(encoding)` on the buffer returning a String instead.
 *
 * @see https://github.com/TooTallNate/ref-struct/issues/28#issuecomment-265626611
 * @ref https://gist.github.com/TooTallNate/80ac2d94b950216a2705
 */
export function BufferTypeFactory(byteLength: number, encoding?: BufferEncoding): StringBuffer {
  assert(byteLength >= 0)

  const inst = Object.create(types.byte, {
    constructor: {
      configurable: true,
      enumerable: false,
      writable: true,
      value: BufferTypeFactory,
    },

    size: {
      configurable: true,
      enumerable: true,
      writable: false,
      value: byteLength,
    },

    encoding: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: encoding,
    },

    get: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: getFn,
    },

    set: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: setFn,
    },
  }) as StringBuffer

  return inst
}


function getFn(
  this: StringBuffer,
  buffer: Buffer,
  offset: number,
): Buffer | string {

  const buf = buffer.subarray(offset, offset + this.size)
  if (this.encoding) {
    const str = buf.toString(this.encoding)
    return str.replace(/^\0+|\0+$/ug, '')
  }
  return buf
}

function setFn(
  this: StringBuffer,
  buffer: Buffer,
  offset: number,
  value: string | number[] | Buffer,
): void {

  let buf: Buffer

  if (typeof value === 'string') {
    assert(this.encoding, 'BufferType.encoding is required when setting a string')
    buf = Buffer.from(value, this.encoding)
  }
  else if (Array.isArray(value)) {
    buf = Buffer.from(value)
  }
  else if (Buffer.isBuffer(value)) {
    buf = value
  }
  else {
    throw new TypeError('Buffer instance expected')
  }


  if (buf.length > this.size) {
    throw new Error(
      `Buffer given is ${buf.length} bytes, but only ${this.size} bytes available`,
    )
  }

  buf.copy(buffer, offset)
}

