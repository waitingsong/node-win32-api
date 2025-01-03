import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { LPWNDCLASSEXW, WNDCLASSEXW_Factory } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'WNDCLASSEXW'
const pointer = LPWNDCLASSEXW
const factory = WNDCLASSEXW_Factory
const size = 80
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size })
    })
  })
})

