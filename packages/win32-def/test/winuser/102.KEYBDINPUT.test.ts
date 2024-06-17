import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { KEYBDINPUT_Factory, LPKEYBDINPUT } from '##/lib/winuser/winuser.index.js'


const fn = 'KEYBDINPUT_Factory'
const factory = KEYBDINPUT_Factory
const key = 'KEYBDINPUT'
const ptr = LPKEYBDINPUT

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assert(data)
      assert(data.name === key)
      assert(data.pointer === ptr)
      assert(data.size === 24, `size: ${data.size}`)
    })
  })
})

