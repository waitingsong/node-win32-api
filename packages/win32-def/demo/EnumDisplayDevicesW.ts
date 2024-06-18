#!/usr/bin/env tsx
import assert from 'node:assert/strict'

import ffi from 'koffi'
import * as W from 'win32-def/common.def'
import * as S from 'win32-def/struct'


console.info('EnumDisplayDevicesW()')

const st = S.DISPLAY_DEVICEW_Factory()
console.info('size', st.size) // 840/1672
const dd = {
  cb: st.size,
} as S.DISPLAY_DEVICEW_Type

const foo = ffi.introspect(st.CType)
console.info({ foo })

const user32 = ffi.load('user32.dll')
try {
  const func = user32.func(
    '__stdcall',
    'EnumDisplayDevicesW',
    W.BOOL,
    [W.LPCWSTR, W.DWORD, `_Inout_ ${S.LPDISPLAY_DEVICEW}`, W.DWORD])


  const res = func(null, 0, dd, 1) as number
  console.info({ res, dd })
  const {
    DeviceID,
    DeviceKey,
    DeviceName,
    DeviceString,
  } = dd

  console.log('DeviceID:', DeviceID.toString('ucs2'))

}
finally {
  user32.unload()
}


