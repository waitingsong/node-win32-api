import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { POINT_Factory, LPPOINT } from '##/lib/winuser/winuser.index.js'


const fn = 'POINT_Factory'
const factory = POINT_Factory
const key = 'POINT'
const ptr = LPPOINT

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assert(data)
      assert(data.name === key)
      assert(data.pointer === ptr)
      assert(data.size === 8, `size: ${data.size}`)
    })
  })
})

