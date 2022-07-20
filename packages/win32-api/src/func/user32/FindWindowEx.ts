import {
  DModel as M,
  genUcsBufferFrom,
} from '../../index.js'
import { getMod } from '../func.helper.js'

import { Win32Fns, dllName } from './helper.js'


/**
 * Retrieves a handle to the specified printer or print server or other types of handles in the print subsystem.
 * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/openprinter
 * @docs https://docs.microsoft.com/zh-cn/windows/win32/printdocs/openprinter
 */
export async function user32FindWindowEx(
  hwndParent: M.HWND,
  hwndChildAfter: M.HWND,
  lpszClass: string | null,
  lpszWindow: string | null,
): Promise<M.HWND | undefined> {

  const mod = getMod<Win32Fns>(dllName)

  const lpszClassBuf = genUcsBufferFrom(lpszClass)
  const lpszWindowBuf = genUcsBufferFrom(lpszWindow)

  const hWnd = await mod.FindWindowExW(
    hwndParent,
    hwndChildAfter,
    lpszClassBuf,
    lpszWindowBuf,
  )

  const ret = hWnd ? hWnd : undefined
  return ret
}

