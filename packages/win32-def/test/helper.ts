import assert from 'node:assert'

import { StructDetail } from '##/index.js'


type ExpectData = Omit<StructDetail, 'CType'>

export function assertStructUnion(src: StructDetail, expect: ExpectData): void {
  assert(src)
  assert(src.name === expect.name, `name: ${src.name}`)
  assert(src.pointer === expect.pointer, `pointer: ${src.pointer}`)
  assert(src.size === expect.size, `size: ${src.size}`)
}

