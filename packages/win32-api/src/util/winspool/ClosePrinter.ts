import assert from 'node:assert'

import type { HWND } from 'win32-def/types'

import { load } from '##/lib/winspool/index.js'
import type { LibWinspool } from '##/lib/winspool/index.js'


const funcName: keyof LibWinspool = 'ClosePrinter'
// type RetType = ReturnType<FnType>
// type ParamType = Parameters<FnType>


/**
 * @link https://learn.microsoft.com/zh-cn/windows/win32/printdocs/closeprinter
 */
export async function ClosePrinter(hwnd: HWND): Promise<boolean> {
  assert(hwnd, 'hwnd must be a valid handle')

  const lib = load([funcName])
  const res = await lib.ClosePrinter_Async(hwnd)
  return !! res
}

