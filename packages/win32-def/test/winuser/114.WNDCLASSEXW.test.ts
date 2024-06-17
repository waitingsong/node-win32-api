import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { WNDCLASSEXW_Factory, LPWNDCLASSEXW } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'WNDCLASSEXW'
const pointer = LPWNDCLASSEXW
const factory = WNDCLASSEXW_Factory
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size: 80 })
    })
  })
})

