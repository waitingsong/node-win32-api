import { fileShortPath } from '@waiting/shared-core'

import { PRINTER_INFO_9_Factory, PPRINTER_INFO_9 } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'PRINTER_INFO_9'
const pointer = PPRINTER_INFO_9
const factory = PRINTER_INFO_9_Factory
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

