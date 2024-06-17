import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { INITCOMMONCONTROLSEX_Factory, LPINITCOMMONCONTROLSEX } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'INITCOMMONCONTROLSEX'
const pointer = LPINITCOMMONCONTROLSEX
const factory = INITCOMMONCONTROLSEX_Factory
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size: 8 })
    })
  })
})

