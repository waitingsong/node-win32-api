import assert from 'assert'

import * as T from 'win32-def'

import { load, LibFns } from '##/lib/user32/index.js'


const fnName: keyof LibFns = 'FindWindowExW'
const fnAsyncName: keyof LibFns = 'FindWindowExWAsync'
type FnType = LibFns['FindWindowExWAsync']

/**
 * Retrieves a handle to a window whose class name and window name match the specified strings.
 * The function searches child windows, beginning with the one following the specified child window.
 * This function does not perform a case-sensitive search.
 *
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-findwindowexw
 * @link https://learn.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-findwindowexw
 */
export async function FindWindowExW(
  hwndParent: T.HWND,
  hwndChildAfter: T.HWND,
  lpszClass: T.LPCTSTR | null,
  lpszWindow: T.LPCTSTR | null,
): Promise<T.HWND> {

  const lib = load([fnName])
  const fn = lib[fnAsyncName] as FnType
  assert(typeof fn === 'function', `Function "${fnAsyncName}" not found`)

  const hwnd = await fn(hwndParent, hwndChildAfter, lpszClass, lpszWindow)
  return hwnd
}

