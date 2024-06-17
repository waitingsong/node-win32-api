import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { KEYBDINPUT_Factory, LPKEYBDINPUT } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'KEYBDINPUT'
const pointer = LPKEYBDINPUT
const factory = KEYBDINPUT_Factory
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size: 24 })
    })
  })
})

