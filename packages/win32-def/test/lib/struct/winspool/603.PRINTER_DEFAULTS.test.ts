import { fileShortPath } from '@waiting/shared-core'

import { PPRINTER_DEFAULTS, PRINTER_DEFAULTS_Factory } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'PRINTER_DEFAULTS'
const pointer = PPRINTER_DEFAULTS
const factory = PRINTER_DEFAULTS_Factory
const size = 232
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size })
    })
  })
})

