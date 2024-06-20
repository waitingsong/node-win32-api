#!/usr/bin/env tsx
import assert from 'node:assert/strict'

import { sleep } from '@waiting/shared-core'
import ffi from 'koffi'
import { INPUT, KEYBDINPUT, VirtualKey } from 'win32-def/consts'
import { INPUT_Factory, type INPUT_Type } from 'win32-def/struct'


console.info('Show/hide desktop with Win+D shortcut')

const user32 = ffi.load('user32.dll')

const { INPUT_KEYBOARD } = INPUT
const { KEYEVENTF_KEYUP } = KEYBDINPUT
const { VK_RWIN } = VirtualKey
const { VK_D } = VirtualKey

export const events: INPUT_Type[] = [
  make_keyboard_event(VK_RWIN, true),
  make_keyboard_event(VK_D, true),
  make_keyboard_event(VK_D, false),
  make_keyboard_event(VK_RWIN, false),
]

export const { size, pointer } = INPUT_Factory()

try {
  const SendInput = user32.func('__stdcall', 'SendInput', 'uint', ['uint', pointer, 'int'])

  const res = SendInput(events.length, events, size) as number
  assert(res === events.length)
  // console.info({ res })

  await sleep(2000)

  await SendInput.async(events.length, events, size, (err: Error | undefined, res2: number) => {
    if (err) {
      console.error(err)
      throw err
    }
    assert(res2 === events.length)
  }) as number

}
finally {
  console.info('end')
  user32.unload()
}


// Utility
export function make_keyboard_event(vk: VirtualKey, down: boolean) {
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

