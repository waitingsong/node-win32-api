#!/usr/bin/env tsx
import assert from 'node:assert/strict'

import ffi from 'koffi'

import { INPUT, KEYBDINPUT, VirtualKey } from '##/index.consts.js'
import { INPUT_Factory, INPUT_Type, } from '##/lib/winuser/winuser.index.js'
import { sleep } from '@waiting/shared-core'


console.info('Show/hide desktop with Win+D shortcut')

const user32 = ffi.load('user32.dll')

const INPUT_KEYBOARD = INPUT.INPUT_KEYBOARD
const KEYEVENTF_KEYUP = KEYBDINPUT.KEYEVENTF_KEYUP
const VK_RWIN = VirtualKey.VK_RWIN
const VK_D = VirtualKey.VK_D

export const events: unknown[] = [
  make_keyboard_event(VK_RWIN, true),
  make_keyboard_event(VK_D, true),
  make_keyboard_event(VK_D, false),
  make_keyboard_event(VK_RWIN, false),
]

export const input = INPUT_Factory()

try {
  const size = input.size
  console.log('mts:',  {size })
  const SendInput = user32.func('__stdcall', 'SendInput', 'uint', ['uint', input.pointer, 'int'])

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
  console.log('mts: end')
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
