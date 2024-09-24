import assert from 'node:assert'

import { load } from '##/lib/user32/index.js'
import type { LibUser32 } from '##/lib/user32/index.js'


const fnName: keyof LibUser32 = 'FindWindowExW'
const fnAsyncName: keyof LibUser32 = 'FindWindowExW_Async'
type FnType = LibUser32[typeof fnAsyncName]
type RetType = ReturnType<FnType>
type ParamType = Parameters<FnType>

/**
 * Retrieves a handle to a window whose class name and window name match the specified strings.
 * The function searches child windows, beginning with the one following the specified child window.
 * This function does not perform a case-sensitive search.
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-findwindowexw
 *
 * 检索其类名和窗口名称与指定字符串匹配的窗口的句柄。 函数搜索子窗口，从指定子窗口后面的子窗口开始。 此函数不执行区分大小写的搜索。
 * @link https://learn.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-findwindowexw
 */
export async function FindWindowEx(
  hwndParent: ParamType[0],
  hwndChildAfter: ParamType[1],
  lpszClass: ParamType[2],
  lpszWindow: ParamType[3],
): Promise<RetType> {

  const lib = load([fnName])
  const fn = lib[fnAsyncName] as FnType
  assert(typeof fn === 'function', `Function "${fnAsyncName}" not found`)

  const hwnd = await fn(hwndParent, hwndChildAfter, lpszClass, lpszWindow)
  return hwnd
}

