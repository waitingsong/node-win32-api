import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { RID_DEVICE_INFO_KEYBOARD_Factory, PRID_DEVICE_INFO_KEYBOARD } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'RID_DEVICE_INFO_KEYBOARD'
const pointer = PRID_DEVICE_INFO_KEYBOARD
const factory = RID_DEVICE_INFO_KEYBOARD_Factory
const size = 24
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size })
    })
  })
})

