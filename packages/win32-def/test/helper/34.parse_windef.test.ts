import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import {
  settingsDefault,
  _UNICODE_HOLDER,
  _WIN64_HOLDER,
} from '../../src/lib/config.js'
import {
  DataTypes,
  MacroMap,
} from '../../src/lib/ffi.model.js'
import { parse_windef } from '../../src/lib/helper.js'
import { macroMap } from '../../src/lib/marcomap.js'
import * as WD from '../../src/lib/windef.js'


describe(fileShortPath(import.meta.url), () => {
  const fnName = 'parse_windef()'
  const fake = 'fake'

  it(`Should ${fnName} process windef with fake windef correctly)`, () => {
    const W = { ...WD }

    Object.defineProperty(W, fake, {
      configurable: true,
      writable: true,
      enumerable: true,
      value: 777, // should string or string[]
    })
    try {
      parse_windef(W, macroMap)
      assert(false, 'should throw Error, but none')
    }
    catch (ex) {
      assert(true)
    }

    Object.getOwnPropertyNames(W).forEach((val) => {
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
      parse_windef(W, macroMap)
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
    const W: DataTypes = {}
    const keyArch = '__testKeyArch'
    const v64 = '_v64'
    const v32 = '_v32'

    W[keyArch] = _WIN64_HOLDER
    let map: MacroMap = new Map([ [keyArch, [_WIN64_HOLDER, v64, v32] ] ])

    let _WIN64 = true
    try {
      parse_windef(W, map, { ...settingsDefault, _WIN64 })
      assert(false, 'should throw error by validateWinData() BUT not')
    }
    catch (ex) {
      assert(true)
    }

    _WIN64 = false
    try {
      parse_windef(W, map, { ...settingsDefault, _WIN64 })
      assert(false, 'should throw error by validateWinData() BUT not')
    }
    catch (ex) {
      assert(true)
    }

    const keyUni = '__testKeyUNI'
    const uni = '_valueUNICODE'
    const ansi = '_valueANSI'

    delete W[keyArch]
    W[keyUni] = _UNICODE_HOLDER
    map = new Map([ [keyUni, [_UNICODE_HOLDER, uni, ansi] ] ]) as MacroMap

    let _UNICODE = true
    try {
      parse_windef(W, map, { ...settingsDefault, _UNICODE })
      assert(false, 'should throw error by validateWinData() BUT not')
    }
    catch (ex) {
      assert(true)
    }

    _UNICODE = false
    try {
      parse_windef(W, map, { ...settingsDefault, _UNICODE })
      assert(false, 'should throw error by validateWinData() BUT not')
    }
    catch (ex) {
      assert(true)
    }

  })

  // at lastest
  it(`Should ${fnName} process windef correctly)`, () => {
    const W = { ...WD }
    const windata = parse_windef(W, macroMap, { ...settingsDefault })
    const lenData = Object.keys(windata).length
    const lenDef = Object.keys(W).length

    if (lenData !== lenDef) {
      const onlyInRet: Set<string> = new Set()
      const onlyInW: Set<string> = new Set()

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

      console.info(onlyInRet, onlyInW)
      assert(false, `lenData:${lenData}, lenDef:${lenDef} not equal `)
    }

  })
})

