import { fileShortPath } from '@waiting/shared-core'

import { FILETIME_Factory, LPFILETIME } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'FILETIME'
const pointer = LPFILETIME
const factory = FILETIME_Factory
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

