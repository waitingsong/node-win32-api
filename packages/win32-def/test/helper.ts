import assert from 'node:assert'

import { KoffiTypeResult } from '##/index.js'


type ExpectData = Omit<KoffiTypeResult, 'CType'>

export function assertStructUnion(src: KoffiTypeResult, expect: ExpectData): void {
  assert(src)
  assert(src.name === expect.name, `name: ${src.name}`)
  assert(src.pointer === expect.pointer, `pointer: ${src.pointer}`)
  assert(src.size === expect.size, `size: ${src.size}`)
}

