import assert from 'node:assert'

import { KoffiTypeResult } from '##/index.js'


type ExpectData = Omit<KoffiTypeResult, 'CType'>

export function assertStructUnion(src: KoffiTypeResult, expect: ExpectData): void {
  assert(src)
  assert(src.name === expect.name)
  assert(src.pointer === expect.pointer)
  assert(src.size === expect.size, `size: ${src.size}`)
}

