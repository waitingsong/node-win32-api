/// <reference types="mocha" />

import * as assert from 'power-assert'
import rewire = require('rewire')

import {
  settingsDefault,
  _UNICODE_HOLDER,
  _WIN64_HOLDER,
} from '../src/lib/config'
import * as H from '../src/lib/helper'
import { macroMap } from '../src/lib/marcomap'
import * as WM from '../src/lib/model'
import * as WD from '../src/lib/windef'
import {
  basename,
  logger,
} from '../src/shared/index'


const filename = basename(__filename)
const mods = rewire('../src/lib/helper')


describe(filename + ' :parse_param_placeholder(param, settings?) ', () => {
  const fnName = 'parse_param_placeholder'
  const fn = <(
    param: WM.FFIParam | WM.MacroDef,
    settings?: WM.LoadSettings
  ) => WM.FFIParam> mods.__get__(fnName)

  it(`Should ${fnName} handle value of settings correctly)`, () => {
    const st = <WM.LoadSettings> {...settingsDefault}
    try {
      const p: any = null
      fn(p, st)
      assert(false, 'should throw Error by invalid param, but not')
    }
    catch (ex) {
      assert(true)
    }
  })

  it(`Should ${fnName} handle value of param correctly)`, () => {
    const st = <WM.LoadSettings> {...settingsDefault}
    try {
      const p: WM.MacroDef = ['invalid_placeholder', 'int64', 'int32']
      fn(p, st)
      assert(false, 'should throw Error by invalid param, but not')
    }
    catch (ex) {
      assert(true)
    }
  })

  it(`Should ${fnName} handle value of settings for arch of nodejs correctly)`, () => {
    const p1 = 'debug_int64'
    const p2 = 'debug_int32'
    const p: WM.MacroDef = [_WIN64_HOLDER, p1, p2]
    const st = {...settingsDefault}
    const str1 = fn(p, {...st, _WIN64: true})
    assert(str1 === p1, `result should be "${p1}", got ${str1}`)

    const str2 = fn(p, {...st, _WIN64: false})
    assert(str2 === p2, `result should be "${p2}", got ${str2}`)
  })

  it(`Should ${fnName} handle value of settings for ANSI/UNICODE correctly)`, () => {
    const LPTSTR: WM.MacroDef = [_UNICODE_HOLDER, WD.LPWSTR, 'uint8*']
    const st = {...settingsDefault}
    const str1 = fn(LPTSTR, {...st, _UNICODE: true})
    assert(str1 === LPTSTR[1], `result should be "${LPTSTR[1]}", got ${str1}`)

    const str2 = fn(LPTSTR, {...st, _UNICODE: false})
    assert(str2 === LPTSTR[2], `result should be "${LPTSTR[2]}", got ${str2}`)
  })

  it(`Should ${fnName} handle invalid length of param correctly)`, () => {
    const LPTSTR: WM.MacroDef = [_UNICODE_HOLDER, WD.LPWSTR]
    const st = {...settingsDefault}

    try {
      fn(LPTSTR, {...st, _UNICODE: true})
      assert(false, 'shout throw error but NOT')
    }
    catch (ex) {
      assert(true)
    }
  })

  it(`Should ${fnName} handle blank of param correctly)`, () => {
    const LPTSTR = ''
    const st = {...settingsDefault}

    try {
      fn(LPTSTR, {...st, _UNICODE: true})
      assert(false, 'shout throw error but NOT')
    }
    catch (ex) {
      assert(true)
    }
  })


})


describe(filename + ' :parse_placeholder_arch(param, _WIN64)', () => {
  const fnName = 'parse_placeholder_arch'
  const fn = <(
    param: WM.FFIParam | WM.MacroDef,
    _WIN64: boolean
  ) => WM.FFIParam> mods.__get__(fnName)

  it(`Should ${fnName} handle value of param correctly)`, () => {
    const p: any = 'test'
    const res = fn(p, true)
    assert(res === p, `should ${p} got ${res}`)
  })

  it(`Should ${fnName} handle value of param correctly)`, () => {
    try {
      const p: any = null

      fn(p, true)
      assert(false, 'should throw Error by invalid param, but not')
    }
    catch (ex) {
      assert(true)
    }
  })

  it(`Should ${fnName} handle value of param correctly)`, () => {
    try {
      const p: any = [1, 2]    // should 3 items
      fn(p, true)
      assert(false, 'should throw Error by invalid param, but not')
    }
    catch (ex) {
      assert(true)
    }
  })

})

describe(filename + ' :parse_placeholder_unicode(param, _WIN64)', () => {
  const fnName = 'parse_placeholder_unicode'
  const fn = <(
    param: WM.FFIParam | WM.MacroDef,
    _UNICODE: boolean
  ) => WM.FFIParam> mods.__get__(fnName)

  it(`Should ${fnName} handle value of param correctly)`, () => {
    const p: any = 'test'
    const res = fn(p, true)
    assert(res === p, `should ${p} got ${res}`)
  })

  it(`Should ${fnName} handle value of param correctly)`, () => {
    try {
      const p: any = null

      fn(p, true)
      assert(false, 'should throw Error by invalid param, but not')
    }
    catch (ex) {
      assert(true)
    }
  })

  it(`Should ${fnName} handle value of param correctly)`, () => {
    try {
      const p: any = [1, 2]    // should 3 items
      fn(p, true)
      assert(false, 'should throw Error by invalid param, but not')
    }
    catch (ex) {
      assert(true)
    }
  })

})

describe(filename + ' :parse_windef()', () => {
  const fnName = 'parse_windef()'
  const fake = 'fake'

  it(`Should ${fnName} process windef with fake windef correctly)`, () => {
    const W = {...WD}

    Object.defineProperty(W, fake, {
      configurable: true,
      writable: true,
      enumerable: true,
      value: 777, // should string or string[]
    })
    try {
      H.parse_windef(W, macroMap)
      assert(false, 'should throw Error, but none')
    }
    catch (ex) {
      assert(true)
    }

    Object.getOwnPropertyNames(W).forEach((val, idx) => {
      if (val === fake) {
        W[val] = 'int'
      }
    })
    Object.defineProperty(W, 777, { // should string
      configurable: true,
      writable: true,
      enumerable: true,
      value: 'int',
    })
    try {
      H.parse_windef(W, macroMap)
      assert(false, 'should throw Error, but none')
    }
    catch (ex) {
      Object.defineProperty(W, 777, { // should string
        enumerable: false,
      })
      assert(true)
    }
  })

  it(`Should ${fnName} process windef macro members correctly)`, () => {
    const W = <WM.DataTypes> {}
    const keyArch = '__testKeyArch'
    const v64 = '_v64'
    const v32 = '_v32'

    W[keyArch] = _WIN64_HOLDER
    W.macroMap = <WM.MacroMap> new Map([
      [keyArch, [_WIN64_HOLDER, v64, v32]],
    ])

    let _WIN64 = true
    try {
      H.parse_windef(W, macroMap, {...settingsDefault, _WIN64})
      assert(false, 'should throw error by validDataDef() BUT not')
    }
    catch (ex) {
      assert(true)
    }

    _WIN64 = false
    try {
      H.parse_windef(W, macroMap, {...settingsDefault, _WIN64})
      assert(false, 'should throw error by validDataDef() BUT not')
    }
    catch (ex) {
      assert(true)
    }

    const keyUni = '__testKeyUNI'
    const uni = '_valueUNICODE'
    const ansi = '_valueANSI'

    delete W[keyArch]
    W[keyUni] = _UNICODE_HOLDER
    W.macroMap = <WM.MacroMap> new Map([
      [keyUni, [_UNICODE_HOLDER, uni, ansi]],
    ])

    let _UNICODE = true
    try {
      H.parse_windef(W, macroMap, {...settingsDefault, _UNICODE})
      assert(false, 'should throw error by validDataDef() BUT not')
    }
    catch (ex) {
      assert(true)
    }

    _UNICODE = false
    try {
      H.parse_windef(W, macroMap, {...settingsDefault, _UNICODE})
      assert(false, 'should throw error by validDataDef() BUT not')
    }
    catch (ex) {
      assert(true)
    }

  })

  // at lastest
  it(`Should ${fnName} process windef correctly)`, () => {
    const W = {...WD}
    const windata = H.parse_windef(W, macroMap, {...settingsDefault})
    const lenData = Object.keys(windata).length
    const lenDef = Object.keys(W).length

    if (lenData !== lenDef) {
      const onlyInRet = <Set<string>> new Set()
      const onlyInW = <Set<string>> new Set()

      for (const key of Object.keys(windata)) {
        if (typeof W[key] === 'undefined') {
          onlyInRet.add(key)
        }
      }
      for (const key of Object.keys(W)) {
        if (typeof windata[key] === 'undefined') {
          onlyInW.add(key)
        }
      }

      logger(onlyInRet, onlyInW)
      assert(false, `lenData:${lenData}, lenDef:${lenDef} not equal `)
    }

  })

})

