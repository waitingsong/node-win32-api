import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { COPYDATASTRUCT_Factory, LPCOPYDATASTRUCT } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const fn = 'COPYDATASTRUCT_Factory'
const factory = COPYDATASTRUCT_Factory
const name = 'COPYDATASTRUCT'
const pointer = LPCOPYDATASTRUCT

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size: 24 })
    })

  })
})

