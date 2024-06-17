import { fileShortPath } from '@waiting/shared-core'

import { PRINTPROCESSOR_INFO_1_Factory, PPRINTPROCESSOR_INFO_1 } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'PRINTPROCESSOR_INFO_1'
const pointer = PPRINTPROCESSOR_INFO_1
const factory = PRINTPROCESSOR_INFO_1_Factory
const size = 8
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size })
    })
  })
})

