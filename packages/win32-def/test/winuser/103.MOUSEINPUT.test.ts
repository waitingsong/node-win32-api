import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { MOUSEINPUT_Factory, LPMOUSEINPUT } from '##/lib/winuser/winuser.index.js'
import { assertStructUnion } from '#@/helper.js'


const fn = 'MOUSEINPUT_Factory'
const factory = MOUSEINPUT_Factory
const name = 'MOUSEINPUT'
const pointer = LPMOUSEINPUT

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size: 32 })
    })
  })
})

