import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { MSG_Factory, LPMSG } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'MSG'
const pointer = LPMSG
const factory = MSG_Factory
const size = 48
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size })
    })
  })
})

