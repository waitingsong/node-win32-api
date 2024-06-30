import assert from 'node:assert'

import type { HWND } from 'win32-def/types'

import { load } from '##/lib/winspool/index.js'
import type { LibWinspool } from '##/lib/winspool/index.js'


const funcName: keyof LibWinspool = 'EndDocPrinter'

/**
 * @link https://learn.microsoft.com/zh-cn/windows/win32/printdocs/EndDocPrinter
 */
export async function EndDocPrinter(hwnd: HWND): Promise<boolean> {
  assert(hwnd, 'hwnd must be a valid handle')

  const lib = load([funcName])
  const res = await lib.EndDocPrinter_Async(hwnd)
  return !! res
}

