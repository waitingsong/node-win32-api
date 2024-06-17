import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { RID_DEVICE_INFO_MOUSE_Factory, LPRID_DEVICE_INFO_MOUSE } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'RID_DEVICE_INFO_MOUSE'
const pointer = LPRID_DEVICE_INFO_MOUSE
const factory = RID_DEVICE_INFO_MOUSE_Factory
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size: 16 })
    })
  })
})

