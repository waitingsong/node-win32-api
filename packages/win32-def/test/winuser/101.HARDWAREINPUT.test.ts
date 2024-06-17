import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { HARDWAREINPUT_Factory, LPHARDWAREINPUT } from '##/lib/winuser/winuser.index.js'


const fn = 'HARDWAREINPUT_Factory'
const factory = HARDWAREINPUT_Factory
const key = 'HARDWAREINPUT'
const ptr = LPHARDWAREINPUT

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

