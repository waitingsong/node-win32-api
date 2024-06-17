// ref: https://koffi.dev/unions
import { INPUT, KEYBDINPUT, VirtualKey } from 'win32-def/consts'
import type { INPUT_Type } from 'win32-def/winuser'


const INPUT_KEYBOARD = INPUT.INPUT_KEYBOARD
const KEYEVENTF_KEYUP = KEYBDINPUT.KEYEVENTF_KEYUP
const VK_RWIN = VirtualKey.VK_RWIN
const VK_D = VirtualKey.VK_D

export const events = [
  make_keyboard_event(VK_RWIN, true),
  make_keyboard_event(VK_D, true),
  make_keyboard_event(VK_D, false),
  make_keyboard_event(VK_RWIN, false),
]


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

