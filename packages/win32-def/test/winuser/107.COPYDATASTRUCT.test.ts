import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { COPYDATASTRUCT_Factory, LPCOPYDATASTRUCT } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'COPYDATASTRUCT'
const pointer = LPCOPYDATASTRUCT
const factory = COPYDATASTRUCT_Factory
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size: 24 })
    })

  })
})

