import assert from 'assert'

// eslint-disable-next-line import/no-extraneous-dependencies
import { Type, types } from 'ref-napi'


export interface BufferType extends Type {
  size: number
  encoding: BufferEncoding | void
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
export function BufferTypeFactory(length: number, encoding?: BufferEncoding): BufferType {
  assert(length >= 0)

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
      value: length,
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
  }) as BufferType

  return inst
}


function getFn(
  this: BufferType,
  buffer: Buffer,
  offset: number,
): Buffer | string {

  const buf = buffer.subarray(offset, offset + this.size)
  if (this.encoding) {
    const str = buf.toString(this.encoding)
    return str
  }
  return buf
}

function setFn(
  this: BufferType,
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

