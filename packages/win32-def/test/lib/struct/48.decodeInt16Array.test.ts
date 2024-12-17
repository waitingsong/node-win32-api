import assert from 'node:assert'

import { fileShortPath, sleep } from '@waiting/shared-core'

import { decodeInt16Array, load } from '##/index.js'
import type { LoadOptions } from '##/index.js'
import { DISPLAY_DEVICEW_Factory } from '##/index.struct.js'
import { DefWin32 } from '#@/def.class/api.helper.js'
import type { Win32 } from '#@/def.class/api.helper.js'


describe(fileShortPath(import.meta.url), () => {
  const options: LoadOptions<Win32> = {
    dll: 'user32.dll',
    dllFuncs: DefWin32,
  }

  describe('decodeInt16Array()', () => {
    it('normal', async () => {
      const lib = load<Win32>(options)
      const { payload } = DISPLAY_DEVICEW_Factory()

      const res = await lib.EnumDisplayDevicesW_Async(null, 0, payload, 1)

      const DeviceID = decodeInt16Array(payload.DeviceID)
      const DeviceKey = decodeInt16Array(payload.DeviceKey)
      const DeviceName = decodeInt16Array(payload.DeviceName)
      const DeviceString = decodeInt16Array(payload.DeviceString)

      console.info({ res, DeviceID, DeviceKey, DeviceName, DeviceString })

      assert(DeviceID.startsWith(String.raw`PCI\VEN_`) || DeviceID.includes('VMBUS') || DeviceID === '', DeviceID)
      assert(typeof DeviceKey === 'string', DeviceKey)
      assert(DeviceName === String.raw`\\.\DISPLAY1`, DeviceName)
      assert(DeviceString.length > 0)
      const flag = ['Microsoft Hyper-V', 'Intel', 'AMD', 'Radeon'].some(val => DeviceString.includes(val))
      assert(flag, DeviceString)
    })
  })
})

