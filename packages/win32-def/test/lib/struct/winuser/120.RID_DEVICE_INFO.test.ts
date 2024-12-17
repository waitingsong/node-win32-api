import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { LPRID_DEVICE_INFO, RID_DEVICE_INFO_Factory } from '##/index.struct.js'
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

