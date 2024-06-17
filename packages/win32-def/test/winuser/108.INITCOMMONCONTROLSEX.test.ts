import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { INITCOMMONCONTROLSEX_Factory, LPINITCOMMONCONTROLSEX } from '##/lib/winuser/winuser.index.js'
import { assertStructUnion } from '#@/helper.js'


const fn = 'INITCOMMONCONTROLSEX_Factory'
const factory = INITCOMMONCONTROLSEX_Factory
const name = 'INITCOMMONCONTROLSEX'
const pointer = LPINITCOMMONCONTROLSEX

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size: 8 })
    })
  })
})

