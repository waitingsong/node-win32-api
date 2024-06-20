import assert from 'assert'

import * as T from 'win32-def'

import { load, LibFns } from '##/lib/user32/index.js'


const fnName: keyof LibFns = 'FindWindowExW'
const fnAsyncName: keyof LibFns = 'FindWindowExWAsync'
type FnType = LibFns['FindWindowExWAsync']

/**
 * Retrieves a handle to the specified printer or print server or other types of handles in the print subsystem.
 * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/openprinter
 * @docs https://docs.microsoft.com/zh-cn/windows/win32/printdocs/openprinter
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

