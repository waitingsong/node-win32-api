import { fileShortPath } from '@waiting/shared-core'

import { HARDWAREINPUT_Factory, LPHARDWAREINPUT } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'HARDWAREINPUT'
const pointer = LPHARDWAREINPUT
const factory = HARDWAREINPUT_Factory
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size: 8 })
    })
  })
})

