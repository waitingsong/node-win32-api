#!/usr/bin/env tsx
import assert from 'node:assert/strict'

import ffi from 'koffi'
import * as D from 'win32-def/def'
import * as S from 'win32-def/struct'
import { decodeInt16Array } from 'win32-def'


console.info('EnumDisplayDevicesW()')

const st = S.DISPLAY_DEVICEW_Factory()
console.info('size', st.size)
const dd = {
  cb: st.size,
} as S.DISPLAY_DEVICEW_Type

const typeInfo = ffi.introspect(st.CType)
console.info({ typeInfo })

const user32 = ffi.load('user32.dll')
try {
  const func = user32.func(
    '__stdcall',
    'EnumDisplayDevicesW',
    D.BOOL,
    [D.LPCWSTR, D.DWORD, `_Inout_ ${S.LPDISPLAY_DEVICEW}`, D.DWORD])

  const res = func(null, 0, dd, 1) as number
  const DeviceID = decodeInt16Array(dd.DeviceID)
  const DeviceKey = decodeInt16Array(dd.DeviceKey)
  const DeviceName = decodeInt16Array(dd.DeviceName)
  const DeviceString = decodeInt16Array(dd.DeviceString)

  console.info({ res, DeviceID, DeviceKey, DeviceName, DeviceString })

  assert(DeviceID.startsWith('PCI\\VEN_') || DeviceID.includes('VMBUS') || DeviceID === '', DeviceID)
  assert(typeof DeviceKey === 'string', DeviceKey)
  assert(DeviceName === '\\\\.\\DISPLAY1', DeviceName)
  assert(DeviceString.length > 0)
  const flag = ['Microsoft Hyper-V', 'Intel', 'AMD', 'Radeon'].some(val => DeviceString.includes(val))
  assert(flag === true, DeviceString)
}
finally {
  user32.unload()
}


