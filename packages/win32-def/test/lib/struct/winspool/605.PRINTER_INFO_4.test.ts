import { fileShortPath } from '@waiting/shared-core'

import { PPRINTER_INFO_4, PRINTER_INFO_4_Factory } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'PRINTER_INFO_4'
const pointer = PPRINTER_INFO_4
const factory = PRINTER_INFO_4_Factory
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

