/* c8 ignore start */
import assert from 'node:assert'

import { load } from '##/lib/user32/index.js'
import type { LibUser32 } from '##/lib/user32/index.js'


const fnName: keyof LibUser32 = 'MessageBoxExW'
const fnAsyncName: keyof LibUser32 = 'MessageBoxExW_Async'
type FnType = LibUser32[typeof fnAsyncName]
type RetType = ReturnType<FnType>
type ParamType = Parameters<FnType>

export interface MessageBoxOptions {
  hWnd: ParamType[0]
  lpText: ParamType[1]
  lpCaption: ParamType[2]
  uType: ParamType[3]
  wLanguageId: ParamType[4]
}

/** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-messageboxexw */
export async function MessageBox(options: MessageBoxOptions): RetType {
  const { hWnd, lpText, lpCaption, uType, wLanguageId } = options

  const lib = load([fnName])
  const fn = lib[fnAsyncName] as FnType
  assert(typeof fn === 'function', `Function "${fnAsyncName}" not found`)

  const res = await fn(hWnd, lpText, lpCaption, uType, wLanguageId)
  return res
}

/* c8 ignore stop */

