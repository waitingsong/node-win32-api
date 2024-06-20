import assert from 'node:assert'

import { fileShortPath, sleep } from '@waiting/shared-core'

import * as D from '##/index.def.js'
import { LoadOptions, decodeInt16Array } from '##/index.js'
import * as T from '##/index.js'
import { DISPLAY_DEVICEW_Factory } from '##/index.struct.js'
import { load } from '##/lib/loader/loader.js'
import { type Win32Fns, apiDef } from '#@/api.helper.js'


describe(fileShortPath(import.meta.url), () => {
  const options: LoadOptions<Win32Fns> = {
    dll: 'user32.dll',
    dllFuncs: apiDef,
  }

  describe('decodeInt16Array()', () => {
    it('normal', async () => {
      // const child = spawn('notepad.exe')
      // await sleep(1500)

      try {
        const lib = load<Win32Fns>(options)
        const { size, payload } = DISPLAY_DEVICEW_Factory()
        payload.cb = size

        const res = await lib.EnumDisplayDevicesWAsync(null, 0, payload, 1)

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
        // child.kill()
      }
    })
  })
})

