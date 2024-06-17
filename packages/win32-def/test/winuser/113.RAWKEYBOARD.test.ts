import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { RAWKEYBOARD_Factory, LPRAWKEYBOARD } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'RAWKEYBOARD'
const pointer = LPRAWKEYBOARD
const factory = RAWKEYBOARD_Factory
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size: 16 })
    })
  })
})

