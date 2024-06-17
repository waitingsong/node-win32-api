import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { ALTTABINFO_Factory, LPALTTABINFO } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const fn = 'ALTTABINFO_Factory'
const factory = ALTTABINFO_Factory
const name = 'ALTTABINFO'
const pointer = LPALTTABINFO

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

