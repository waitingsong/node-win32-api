import { fileShortPath } from '@waiting/shared-core'

import { DOC_INFO_1_Factory, LPDOC_INFO_1 } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'DOC_INFO_1'
const pointer = LPDOC_INFO_1
const factory = DOC_INFO_1_Factory
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

