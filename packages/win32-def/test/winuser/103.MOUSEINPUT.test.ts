import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { MOUSEINPUT_Factory, LPMOUSEINPUT } from '##/lib/winuser/winuser.index.js'


const fn = 'MOUSEINPUT_Factory'
const factory = MOUSEINPUT_Factory
const key = 'MOUSEINPUT'
const ptr = LPMOUSEINPUT

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assert(data)
      assert(data.name === key)
      assert(data.pointer === ptr)
      assert(data.size === 32, `size: ${data.size}`)
    })
  })
})

