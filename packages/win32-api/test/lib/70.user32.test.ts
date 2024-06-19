import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'

import { fileShortPath } from '@waiting/shared-core'
import ffi from 'koffi'
import { sleep } from 'zx'

import {
  user32FindWindowEx,
  user32GetWindowText,
} from '##/index.fun.js'
import {
  Types as M,
  DTypes as W,
  DStruct as DS,
  retrieveStructFromPtrAddress,
  StructFactory,
  ucsBufferFrom,
  ucsBufferToString,
} from '##/index.js'

import { calcLpszClassNotepad, calcLpszNotepad } from './config.unittest.js'
import { assertsHwnd, user32, user32Sync } from './helper.js'


const tmpMap = new Map<number | string | bigint, M.POINT>()
const title = 'new-title-' + Math.random().toString()

describe(fileShortPath(import.meta.url), () => {

  describe('find app window by user32.EnumWindows()', () => {
    it('await', async () => {
      const child = spawn('notepad.exe')

      console.log(new Date().toLocaleTimeString())
      await sleep(3000)
      console.log(new Date().toLocaleTimeString())

      const hWnd = await user32FindWindowEx(0, 0, calcLpszNotepad, null)
      assert(hWnd)
      assertsHwnd(hWnd)

      // Change title of the Calculator
      await user32.SetWindowTextW(hWnd, ucsBufferFrom(title))

      const len = title.length
      assert(len > 0)

      const text = await user32GetWindowText(hWnd, len)
      assert(text && text === title, `title should be changed to ${title}, bug got ${text ?? 'n/a'}`)

      const point = StructFactory<M.POINT>(DS.POINT)
      point.x = 101
      point.y = Math.round(Math.random() * 1000000)

      const address = point.ref().address()
      tmpMap.delete(address)

      const enumWindowsProc = createEnumWinProc()

      await enumWindows(enumWindowsProc, address)
      console.log({ address })

      const point2 = tmpMap.get(address)
      assert(point2, 'point2 should be got')
      if (point2) {
        assert(point.x === point2.x)
        assert(point.y === point2.y)
      }
      tmpMap.delete(address)

      child.kill()
      console.log({ killed: child.killed })
      console.log(new Date().toLocaleTimeString())
    })

    it('sync', async () => {
      const child = spawn('notepad.exe')
      const enumWindowsProc = createEnumWinProc()

      console.log(new Date().toLocaleTimeString())
      await sleep(3000)
      console.log(new Date().toLocaleTimeString())

      const hWnd = user32Sync.FindWindowExW(0, 0, calcLpszClassNotepad, null)
      assertsHwnd(hWnd)

      // Change title of the Calculator
      user32Sync.SetWindowTextW(hWnd, ucsBufferFrom(title))

      const len = title.length + 1
      assert(len > 0)
      const buf = Buffer.alloc(len * 2)
      let str = ''

      user32Sync.GetWindowTextW(hWnd, buf, len)
      str = ucsBufferToString(buf)
      assert(str === title, `title should be changed to ${title}, bug got ${str}`)

      const point = StructFactory<M.POINT>(DS.POINT)
      point.x = 101
      point.y = Math.round(Math.random() * 1000000)

      const address = point.ref().address()
      tmpMap.delete(address)

      await enumWindows(enumWindowsProc, address)
      console.log({ address })

      const point2 = tmpMap.get(address)
      assert(point2, 'point2 should be got')
      if (point2) {
        assert(point.x === point2.x)
        assert(point.y === point2.y)
      }
      tmpMap.delete(address)

      child.kill()
      console.log({ killed: child.killed })
      console.log(new Date().toLocaleTimeString())
    })

  })
})


/**
 * Note: It will got "errno 3221225725"
 * if calling frequently in a short time
 */
function createEnumWinProc(): M.WNDENUMPROC {
  // @ts-expect-error
  const enumWindowsProc = ffi.Callback(
    W.BOOL,
    [W.HWND, W.LPARAM],
    (hWnd: M.HWND, lParam: M.LPARAM): M.BOOLEAN => {
      const visible = user32Sync.IsWindowVisible(hWnd)
      if (! visible) {
        return true
      }

      const maxLen = 127
      const buf = Buffer.alloc(maxLen * 2)
      const len = user32Sync.GetWindowTextW(hWnd, buf, maxLen)
      const name = ucsBufferToString(buf)
      name && console.log(name, len)

      if (len && name === title) {
        if (typeof lParam === 'number') {
          const point = retrieveStructFromPtrAddress<M.POINT>(lParam, DS.POINT)
          if (point) {
            console.log({ px: point.x, py: point.y })
            tmpMap.set(lParam, point)
          }
        }
        else {
          console.warn('lParam is not number')
        }
        return false // stop loop if return false
      }

      return true
    },
  )

  process.on('exit', () => {
    typeof enumWindowsProc // avoid gc
  })

  return enumWindowsProc
}


// function enumWindows(proc: M.WNDENUMPROC, id: M.UINT32): void {
//   user32Sync.EnumWindows(proc, id)
// }

function enumWindows(proc: M.WNDENUMPROC, id: M.UINT32): Promise<M.HANDLE> {
  return user32.EnumWindows(proc, id)
}

