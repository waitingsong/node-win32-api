import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import {
  _UNICODE_HOLDER,
  _WIN64_HOLDER,
} from '../../src/lib/config.js'
import { parse_placeholder_arch } from '../../src/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {
  const fnName = 'parse_placeholder_arch'

  it(`Should ${fnName} handle value of param correctly)`, () => {
    const p: any = 'test'
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const res = parse_placeholder_arch(p, true)
    assert(res === p)
  })

  it(`Should ${fnName} handle value of param correctly)`, () => {
    try {
      const p: any = null
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      parse_placeholder_arch(p, true)
      assert(false, 'should throw Error by invalid param, but not')
    }
    catch (ex) {
      assert(true)
    }
  })

  it(`Should ${fnName} handle value of param correctly)`, () => {
    try {
      const p: any = [1, 2] // should 3 items
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      parse_placeholder_arch(p, true)
      assert(false, 'should throw Error by invalid param, but not')
    }
    catch (ex) {
      assert(true)
    }
  })

})

