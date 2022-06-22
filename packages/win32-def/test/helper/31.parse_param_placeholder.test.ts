import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import {
  settingsDefault,
  _UNICODE_HOLDER,
  _WIN64_HOLDER,
} from '../../src/lib/config.js'
import {
  LoadSettings,
  MacroDef,
} from '../../src/lib/ffi.model.js'
import { parse_param_placeholder } from '../../src/lib/helper.js'
import * as WD from '../../src/lib/windef.js'


describe(fileShortPath(import.meta.url), () => {
  const fnName = 'parse_param_placeholder'

  it(`Should ${fnName} handle value of settings correctly)`, () => {
    const st = { ...settingsDefault } as LoadSettings
    try {
      const p: any = null
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
      parse_param_placeholder(p, st)
      assert(false, 'should throw Error by invalid param, but not')
    }
    catch (ex) {
      assert(true)
    }
  })

  it(`Should ${fnName} handle value of param correctly)`, () => {
    const st = { ...settingsDefault } as LoadSettings
    try {
      const p: MacroDef = ['invalid_placeholder', 'int64', 'int32']
      parse_param_placeholder(p, st)
      assert(false, 'should throw Error by invalid param, but not')
    }
    catch (ex) {
      assert(true)
    }
  })

  it(`Should ${fnName} handle value of settings for arch of nodejs correctly)`, () => {
    const p1 = 'debug_int64'
    const p2 = 'debug_int32'
    const p: MacroDef = [_WIN64_HOLDER, p1, p2]
    const st = { ...settingsDefault }
    const str1 = parse_param_placeholder(p, { ...st, _WIN64: true })
    assert(str1 === p1, `result should be "${p1}", got ${str1}`)

    const str2 = parse_param_placeholder(p, { ...st, _WIN64: false })
    assert(str2 === p2, `result should be "${p2}", got ${str2}`)
  })

  it(`Should ${fnName} handle value of settings for ANSI/UNICODE correctly)`, () => {
    const LPTSTR: MacroDef = [_UNICODE_HOLDER, WD.LPWSTR, 'uint8*']
    const st = { ...settingsDefault }
    const str1 = parse_param_placeholder(LPTSTR, { ...st, _UNICODE: true })
    assert(str1 === LPTSTR[1], `result should be "${LPTSTR[1]}", got ${str1}`)

    const str2 = parse_param_placeholder(LPTSTR, { ...st, _UNICODE: false })
    assert(str2 === LPTSTR[2], `result should be "${LPTSTR[2]}", got ${str2}`)
  })

  it(`Should ${fnName} handle invalid length of param correctly)`, () => {
    const LPTSTR = [_UNICODE_HOLDER, WD.LPWSTR]
    const st = { ...settingsDefault }

    try {
      parse_param_placeholder(LPTSTR as [string, string, string], { ...st, _UNICODE: true })
      assert(false, 'shout throw error but NOT')
    }
    catch (ex) {
      assert(true)
    }
  })

  it(`Should ${fnName} handle blank of param correctly)`, () => {
    const LPTSTR = ''
    const st = { ...settingsDefault }

    try {
      parse_param_placeholder(LPTSTR, { ...st, _UNICODE: true })
      assert(false, 'shout throw error but NOT')
    }
    catch (ex) {
      assert(true)
    }
  })


})

