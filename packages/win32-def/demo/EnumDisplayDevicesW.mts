#!/usr/bin/env tsx
/* eslint-disable import/no-extraneous-dependencies */
import assert from 'node:assert/strict'

import ffi from 'koffi'
import { decodeInt16Array } from 'win32-def'
import * as D from 'win32-def/def'
import * as S from 'win32-def/struct'


console.info('EnumDisplayDevicesW()')

const { size, CType, payload } = S.DISPLAY_DEVICEW_Factory()
console.info({ size })
payload.cb = size

const typeInfo = ffi.introspect(CType)
console.info({ typeInfo })

const user32 = ffi.load('user32.dll')
try {
  const func = user32.func(
    '__stdcall',
    'EnumDisplayDevicesW',
    D.BOOL,
    [D.LPCWSTR, D.DWORD, `_Inout_ ${S.LPDISPLAY_DEVICEW}`, D.DWORD],
  )

  const res = func(null, 0, payload, 1) as number
  const DeviceID = decodeInt16Array(payload.DeviceID)
  const DeviceKey = decodeInt16Array(payload.DeviceKey)
  const DeviceName = decodeInt16Array(payload.DeviceName)
  const DeviceString = decodeInt16Array(payload.DeviceString)

  console.info({ res, DeviceID, DeviceKey, DeviceName, DeviceString })

  assert(DeviceID.startsWith('PCI\\VEN_') || DeviceID.includes('VMBUS') || DeviceID === '', DeviceID)
  assert(typeof DeviceKey === 'string', DeviceKey)
  assert(DeviceName === '\\\\.\\DISPLAY1', DeviceName)
  assert(DeviceString.length > 0)
  const flag = ['Microsoft Hyper-V', 'Intel', 'AMD', 'Radeon'].some(val => DeviceString.includes(val))
  assert(flag, DeviceString)
}
finally {
  user32.unload()
}


