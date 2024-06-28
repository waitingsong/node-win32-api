import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { RAWINPUT_Factory, LPRAWINPUT } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'RAWINPUT'
const pointer = LPRAWINPUT
const factory = RAWINPUT_Factory
const size = 48
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size })
    })
  })
})

