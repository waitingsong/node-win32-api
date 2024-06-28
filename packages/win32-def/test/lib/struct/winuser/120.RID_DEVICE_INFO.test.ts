import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { RID_DEVICE_INFO_Factory, LPRID_DEVICE_INFO } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'RID_DEVICE_INFO'
const pointer = LPRID_DEVICE_INFO
const factory = RID_DEVICE_INFO_Factory
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

