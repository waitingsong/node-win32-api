import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { RAWINPUTDEVICELIST_Factory, LPRAWINPUTDEVICELIST } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'RAWINPUTDEVICELIST'
const factory = RAWINPUTDEVICELIST_Factory
const pointer = LPRAWINPUTDEVICELIST
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size: 16 })
    })
  })
})

