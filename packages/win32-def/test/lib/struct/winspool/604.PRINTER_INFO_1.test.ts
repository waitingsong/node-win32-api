import { fileShortPath } from '@waiting/shared-core'

import { PPRINTER_INFO_1, PRINTER_INFO_1_Factory } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'PRINTER_INFO_1'
const pointer = PPRINTER_INFO_1
const factory = PRINTER_INFO_1_Factory
const size = 32
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size })
    })
  })
})

