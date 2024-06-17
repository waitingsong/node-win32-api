import assert from 'node:assert/strict'

import { fileShortPath, sleep } from '@waiting/shared-core'
import ffi from 'koffi'
import { INPUT, KEYBDINPUT, VirtualKey } from 'win32-def/consts'

import { INPUT_Factory, INPUT_Type, LPINPUT } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'INPUT'
const pointer = LPINPUT
const factory = INPUT_Factory
const fn = `${name}_Factory`

const INPUT_KEYBOARD = INPUT.INPUT_KEYBOARD
const KEYEVENTF_KEYUP = KEYBDINPUT.KEYEVENTF_KEYUP
const VK_RWIN = VirtualKey.VK_RWIN
const VK_D = VirtualKey.VK_D

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size: 40 })
    })

    it('Show/hide desktop with Win+D shortcut', async () => {
      const user32 = ffi.load('user32.dll')

      const events: unknown[] = [
        make_keyboard_event(VK_RWIN, true),
        make_keyboard_event(VK_D, true),
        make_keyboard_event(VK_D, false),
        make_keyboard_event(VK_RWIN, false),
      ]

      try {
        const input = factory()
        const size = input.size

        const SendInput = user32.func('__stdcall', 'SendInput', 'uint', ['uint', input.pointer, 'int'])
        const res = SendInput(events.length, events, size) as number
        assert(res === events.length, `res: ${res}`)

        await sleep(2000)

        await SendInput.async(events.length, events, size, (err: Error | undefined, res2: number) => {
          if (err) {
            console.error(err)
            throw err
          }
          assert(res2 === events.length, `res2: ${res2}`)
        }) as number
      }
      finally {
        user32.unload()
      }
    })

  })
})

// Utility
function make_keyboard_event(vk: VirtualKey, down: boolean) {
  const event: INPUT_Type = {
    type: INPUT_KEYBOARD,
    u: {
      ki: {
        wVk: vk,
        wScan: 0,
        dwFlags: down ? 0 : KEYEVENTF_KEYUP,
        time: 0,
        dwExtraInfo: 0,
      },
    },
  }
  return event
}

