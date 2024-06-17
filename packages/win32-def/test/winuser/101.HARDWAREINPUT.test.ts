import { fileShortPath } from '@waiting/shared-core'

import { HARDWAREINPUT_Factory, LPHARDWAREINPUT } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const fn = 'HARDWAREINPUT_Factory'
const factory = HARDWAREINPUT_Factory
const name = 'HARDWAREINPUT'
const pointer = LPHARDWAREINPUT

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size: 8 })
    })
  })
})

