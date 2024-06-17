import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { ALTTABINFO_Factory, LPALTTABINFO } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'ALTTABINFO'
const pointer = LPALTTABINFO
const factory = ALTTABINFO_Factory
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size: 40 })
    })

    it('point cache', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size: 40 })
    })
  })
})

