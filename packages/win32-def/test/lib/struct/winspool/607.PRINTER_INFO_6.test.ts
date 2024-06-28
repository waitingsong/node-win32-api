import { fileShortPath } from '@waiting/shared-core'

import { PRINTER_INFO_6_Factory, PPRINTER_INFO_6 } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'PRINTER_INFO_6'
const pointer = PPRINTER_INFO_6
const factory = PRINTER_INFO_6_Factory
const size = 4
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size })
    })
  })
})

