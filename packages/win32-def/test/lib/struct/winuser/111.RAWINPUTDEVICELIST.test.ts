import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { RAWINPUTDEVICELIST_Factory, LPRAWINPUTDEVICELIST } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'RAWINPUTDEVICELIST'
const pointer = LPRAWINPUTDEVICELIST
const factory = RAWINPUTDEVICELIST_Factory
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

