import { fileShortPath } from '@waiting/shared-core'

import { DEVMODEW_Factory, LPDEVMODEW } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'DEVMODEW'
const pointer = LPDEVMODEW
const factory = DEVMODEW_Factory
const size = 220
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size })
    })
  })
})

