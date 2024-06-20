import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { MOUSEINPUT_Factory, LPMOUSEINPUT } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'MOUSEINPUT'
const pointer = LPMOUSEINPUT
const factory = MOUSEINPUT_Factory
const size = 32
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size })
    })
  })
})

