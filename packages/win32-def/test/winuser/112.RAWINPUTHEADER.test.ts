import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { RAWINPUTHEADER_Factory, LPRAWINPUTHEADER } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'RAWINPUTHEADER'
const pointer = LPRAWINPUTHEADER
const factory = RAWINPUTHEADER_Factory
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size: 24 })
    })
  })
})

