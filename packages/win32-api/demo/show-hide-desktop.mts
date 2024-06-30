#!/usr/bin/env tsx
/* eslint-disable import/no-extraneous-dependencies */
import assert from 'node:assert/strict'

import { sleep } from '@waiting/shared-core'
import { User32 } from 'win32-api'
import { INPUT, KEYBDINPUT, VirtualKey } from 'win32-def/consts'
import { INPUT_Factory } from 'win32-def/struct'
import type { INPUT_Type } from 'win32-def/struct'


console.info('Show/hide desktop with Win+D shortcut')

const { INPUT_KEYBOARD } = INPUT
const { KEYEVENTF_KEYUP } = KEYBDINPUT
const { VK_RWIN } = VirtualKey
const { VK_D } = VirtualKey

const events: INPUT_Type[] = [
  make_keyboard_event(VK_RWIN, true),
  make_keyboard_event(VK_D, true),
  make_keyboard_event(VK_D, false),
  make_keyboard_event(VK_RWIN, false),
]

const { size } = INPUT_Factory()

const lib = User32.load()
const res = await lib.SendInput_Async(events.length, events, size)
assert(res === events.length)

await sleep(2000)

lib.SendInput(events.length, events, size)

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

console.info('finished')

