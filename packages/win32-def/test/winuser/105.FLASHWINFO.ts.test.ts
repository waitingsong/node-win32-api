import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { FLASHWINFO_Factory, PFLASHWINFO } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'FLASHWINFO'
const pointer = PFLASHWINFO
const factory = FLASHWINFO_Factory
const size = 32
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size })
    })
  })
})

