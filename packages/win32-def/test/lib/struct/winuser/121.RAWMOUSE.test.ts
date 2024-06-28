import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { RAWMOUSE_Factory, LPRAWMOUSE } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'RAWMOUSE'
const pointer = LPRAWMOUSE
const factory = RAWMOUSE_Factory
const size = 16 // ? 12
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size })
    })
  })
})

