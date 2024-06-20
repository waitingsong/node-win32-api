import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { WINDOWINFO_Factory, LPWINDOWINFO } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'WINDOWINFO'
const pointer = LPWINDOWINFO
const factory = WINDOWINFO_Factory
const size = 60
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size })
    })
  })
})

