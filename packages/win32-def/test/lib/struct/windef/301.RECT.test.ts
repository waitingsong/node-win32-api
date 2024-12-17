import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { LPRECT, RECT_Factory } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'RECT'
const pointer = LPRECT
const factory = RECT_Factory
const size = 16
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size })
    })
  })
})

