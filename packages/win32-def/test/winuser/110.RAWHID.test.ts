import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { RAWHID_Factory, LPRAWHID } from '##/lib/winuser/winuser.index.js'
import { assertStructUnion } from '#@/helper.js'


const fn = 'RAWHID_Factory'
const factory = RAWHID_Factory
const name = 'RAWHID'
const pointer = LPRAWHID

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size: 16 }) // ? 12
    })
  })
})

