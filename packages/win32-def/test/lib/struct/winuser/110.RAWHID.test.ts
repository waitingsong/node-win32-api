import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { LPRAWHID, RAWHID_Factory } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'RAWHID'
const pointer = LPRAWHID
const factory = RAWHID_Factory
const size = 12
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size })
    })
  })
})

