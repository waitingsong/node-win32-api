import { fileShortPath } from '@waiting/shared-core'

import { DISPLAY_DEVICEW_Factory, LPDISPLAY_DEVICEW } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'DISPLAY_DEVICEW'
const pointer = LPDISPLAY_DEVICEW
const factory = DISPLAY_DEVICEW_Factory
const size = 840
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size })
    })
  })
})

