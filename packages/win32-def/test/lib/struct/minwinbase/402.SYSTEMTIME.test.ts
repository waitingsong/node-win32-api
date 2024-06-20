import { fileShortPath } from '@waiting/shared-core'

import { SYSTEMTIME_Factory, LPSYSTEMTIME } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'SYSTEMTIME'
const pointer = LPSYSTEMTIME
const factory = SYSTEMTIME_Factory
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

