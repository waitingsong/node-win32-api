/// <reference types="mocha" />

import * as assert from 'power-assert'
import rewire = require('rewire')

import { settingsDefault } from '../src/lib/config'
import {
  DataTypes,
  FFIParam,
  LoadSettings,
  MacroDef,
} from '../src/lib/ffi.model'
import * as H from '../src/lib/helper'
import { macroMap } from '../src/lib/marcomap'
import * as WD from '../src/lib/windef'
import {
  basename, logger,
} from '../src/shared/index'

const filename = basename(__filename)
const mods = rewire('../src/lib/helper')

describe(filename, () => {
  const types64_32 = new Set([
    'PVOID', 'HANDLE', 'HACCEL', 'HBITMAP',
    'HBRUSH', 'HCOLORSPACE', 'HCONV', 'HCONVLIST',
    'HCURSOR', 'HDC', 'HDDEDATA', 'HDESK',
    'HDROP', 'HDWP', 'HENHMETAFILE', 'HFILE',
    'HFONT', 'HGDIOBJ', 'HGLOBAL', 'HHOOK',
    'HICON', 'HINSTANCE', 'HKEY', 'HKL',
    'HLOCAL', 'HMENU', 'HMETAFILE', 'HMODULE',
    'HMONITOR', 'HPALETTE', 'HPEN', 'HRGN',
    'HRSRC', 'HSZ', 'HWINEVENTHOOK', 'HWINSTA',
    'HWND', 'LPHANDLE', 'SC_HANDLE', 'SERVICE_STATUS_HANDLE',
    'ULONG_PTR', 'DWORD_PTR', 'PDWORD_PTR', 'PSIZE_T', 'SIZE_T',
    'POINTER_32', 'POINTER_64', 'PHKEY',
  ])
  const typesHalf = new Set([
    'HALF_PTR', 'UHALF_PTR',
  ])

  test_arch(types64_32)
  test_arch_half(typesHalf)
})

function test_arch(types64_32: Set<string>) {
  const st = { ...settingsDefault, _UNICODE: true, _WIN64: true }

  st._WIN64 = false
  _test_arch(types64_32, st)
  // for (const k of Object.keys(st)) {
  //   const opts = {...st}

  //   if (st[k] === true) {
  //     opts[k] = !st[k]
  //   }
  //   _test_arch(types64_32, opts)
  // }
  // for (const k of Object.keys(st)) {
  //   const opts = {...st}
  //   if (st[k] === false) {
  //     opts[k] = !st[k]
  //   }
  //   _test_arch(types64_32, opts)
  // }
}

function _test_arch(types64_32: Set<string>, settings: LoadSettings) {
  const W = H.parse_windef(WD, macroMap, { ...settings })

  for (const vv of types64_32) {
    // convert param like '_WIN64_HOLDER_' to 'int64' or 'int32'
    const param = W[vv]

    it(`Should ${vv}: value converted correctly under nodejs ${settings._WIN64 ? 'x64' : 'ia32'}`, () => {
      if (settings._WIN64) {
        // must use param not W[vv]
        assert(param.indexOf('64') > 2 && param.indexOf('32') === -1, `"${vv}: ${param}" invalid during x64`)
      }
      else {
        if (!(param.indexOf('32') > 2 && param.indexOf('64') === -1)) {
          logger('er:::', W)
        }
        assert(param.indexOf('32') > 2 && param.indexOf('64') === -1, `"${vv}: ${param}" invalid during ia32`)
      }
    })
  }
}

function test_arch_half(values: Set<string>) {
  const st = { ...settingsDefault, _UNICODE: true, _WIN64: true }

  for (const k of Object.keys(st)) {
    if (st[k]) {
      _test_arch_half(values, { ...st, [k]: !st[k] })
    }
  }
  for (const k of Object.keys(st)) {
    if (!st[k]) {
      _test_arch_half(values, { ...st, [k]: !st[k] })
    }
  }
}

function _test_arch_half(typesHalf: Set<string>, settings: LoadSettings) {
  const W = H.parse_windef(WD, macroMap, { ...settings })
  const fnName = 'parse_param_placeholder'
  const fn = <(
    param: FFIParam | MacroDef,
    settings?: LoadSettings
  ) => FFIParam> mods.__get__(fnName)


  for (const vv of typesHalf) {
    // convert param like ['_WIN64_HOLDER_', 'int64', 'int32'] to 'int64' or 'int32'
    const param = fn(W[vv], settings)

    it(`Should ${vv}: value converted correctly under nodejs ${settings._WIN64 ? 'x64' : 'ia32'}`, () => {
      if (settings._WIN64) {
        const cond: boolean = !! param && typeof param === 'string' &&
          param.indexOf('32') > 2 &&
          param.indexOf('16') === -1 &&
          param.indexOf('64') === -1

        assert(cond, `${vv}: ${param} under x64`)   // must use param not W[vv]
      }
      else {
        const cond: boolean = !! param && typeof param === 'string' &&
          param.indexOf('16') > 2 &&
          param.indexOf('32') === -1 &&
          param.indexOf('64') === -1

        assert(cond, `${vv}: ${param} under ia32`)
      }
    })
  }
}

describe(filename, () => {
  const typesUnicode = new Set([
    'LPCTSTR', 'LPTSTR', 'PTBYTE', 'PTCHAR',
    'PTSTR', 'TBYTE', 'TCHAR',
  ])

  unicode(true, typesUnicode)
  unicode(false, typesUnicode)
})

function unicode(_UNICODE: boolean, typesUnicode: Set<string>) {
  const W = H.parse_windef(WD, macroMap, { ...settingsDefault, _UNICODE })

  for (const vv of typesUnicode) {
    const param = W[vv]

    it(`Should macro ${vv}: value mathes setting of ANSI/UNICODE`, () => {
      if (_UNICODE) {
        const cond: boolean = !! param && typeof param === 'string' &&
          param.indexOf('16') > 2 &&
          param.indexOf('8') === -1

        assert(cond, `${vv}: ${param} at UNICODE`)
      }
      else {
        // PTSTR == 'char*' under ia32
        const cond: boolean = !! param && typeof param === 'string' &&
          (param.indexOf('8') > 2 || param === 'char*') &&
          param.indexOf('16') === -1

        assert(cond, `${vv}: ${param} at ANSI`)
      }
    })
  }
}
