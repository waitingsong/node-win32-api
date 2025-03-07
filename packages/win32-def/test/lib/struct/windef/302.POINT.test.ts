import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { LPPOINT, POINT_Factory } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'POINT'
const pointer = LPPOINT
const factory = POINT_Factory
const size = 8
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size })
    })

    it('point cache', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size })
    })
  })
})

