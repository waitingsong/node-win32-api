import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { KEYBDINPUT_Factory, LPKEYBDINPUT } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const fn = 'KEYBDINPUT_Factory'
const factory = KEYBDINPUT_Factory
const name = 'KEYBDINPUT'
const pointer = LPKEYBDINPUT

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size: 24 })
    })
  })
})

