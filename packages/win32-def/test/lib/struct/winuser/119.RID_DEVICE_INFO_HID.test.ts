import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { PRID_DEVICE_INFO_HID, RID_DEVICE_INFO_HID_Factory } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'RID_DEVICE_INFO_HID'
const pointer = PRID_DEVICE_INFO_HID
const factory = RID_DEVICE_INFO_HID_Factory
const size = 16
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size })
    })
  })
})

