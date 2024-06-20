import {
  ucsBufferFrom,
  ucsBufferToString,
} from '../../index.js'
import { getMod } from '../func.helper.js'

import { Win32Fns, dllName, M } from './helper.js'


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
): Promise<M.HWND> {

  const mod = getMod<Win32Fns>(dllName)

  const lpszClassBuf = ucsBufferFrom(lpszClass)
  const lpszWindowBuf = ucsBufferFrom(lpszWindow)

  const hWnd = await mod.FindWindowExW(
    hwndParent,
    hwndChildAfter,
    lpszClassBuf,
    lpszWindowBuf,
  )
  return hWnd
}


/**
 * @docs https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getwindowtextw
 */
export async function user32GetWindowText(
  hWnd: M.HWND,
  /** Not including the null character */
  nMaxCount: M.INT,
): Promise<string> {

  const mod = getMod<Win32Fns>(dllName)

  const len = nMaxCount + 1
  const buf = Buffer.alloc(len * 2)

  const ret = await mod.GetWindowTextW(hWnd, buf, len)
  if (ret > 0) {
    const str = ucsBufferToString(buf, len)
    return str
  }
  return ''
}
