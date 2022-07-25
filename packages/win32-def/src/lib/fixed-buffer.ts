import assert from 'assert'

// eslint-disable-next-line import/no-extraneous-dependencies
import { types } from 'ref-napi'

import { StringBuffer } from './common.types.js'
import { bufferAlign } from './helper.js'


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
      // value: bufferAlign, // 64 or 32 bits
    },

    encoding: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: encoding,
    },

    get: {
      configurable: true,
      enumerable: false,
      writable: true,
      value: getFn,
    },

    set: {
      configurable: true,
      enumerable: false,
      writable: true,
      value: setFn,
    },

    offsetBuffers: {
      configurable: true,
      enumerable: true,
      writable: true,
      value: new Map<number, Buffer>(),
    },
  }) as StringBuffer

  return inst
}


function getFn(
  this: StringBuffer,
  buffer: Buffer,
  offset: number,
): Buffer | string {

  const buf = this.offsetBuffers.get(offset)
  void buffer

  if (! buf) {
    return ''
  }

  // const buf = buffer.subarray(offset, offset + this.size)
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
    const val = value
      ? value.endsWith('\0') ? value : `${value}\0`
      : '\0'
    buf = Buffer.from(val, this.encoding)
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

  if (buf.length > this.size + 2) {
    throw new Error(
      `Buffer given is ${buf.length} bytes, but only ${this.size} bytes available`,
    )
  }

  this.offsetBuffers.set(offset, buf)
  const addr = buf.address()
  if (bufferAlign === 8) {
    buffer.writeUInt64LE(addr, offset)
  }
  else {
    buffer.writeUInt32LE(addr, offset)
  }
  // buf.copy(buffer, offset)
}


