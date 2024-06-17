import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { MSG_Factory, LPMSG } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const fn = 'MSG_Factory'
const factory = MSG_Factory
const name = 'MSG'
const pointer = LPMSG

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size: 48 })
    })
  })
})

