import { BigIntStr } from '@waiting/shared-types'

import {
  ATOM,
  HANDLE,
  HINSTANCE,
  PTR_Addr,
  StructInstanceBase,
} from './common.types.js'
import { POINT } from './struct/struct.types.js'


export interface WinDataType {
  /** uint16 */
  ATOM: ATOM
  BOOL: number
  BOOLEAN: number
  BYTE: number
  CCHAR: number
  CHAR: number
  COLORREF: number
  DWORD: number
  DWORDLONG: number
  DWORD_PTR: PTR_Addr
  DWORD32: number
  DWORD64: number
  FLOAT: number
  HACCEL: HANDLE
  HALF_PTR: number
  HBITMAP: HANDLE
  HBRUSH: HANDLE
  HCOLORSPACE: HANDLE
  HCONV: HANDLE
  HCONVLIST: HANDLE
  HCURSOR: HANDLE
  HDC: HANDLE
  HDDEDATA: HANDLE
  HDESK: HANDLE
  HDROP: HANDLE
  HDWP: HANDLE
  HENHMETAFILE: HANDLE
  HFILE: HANDLE
  HFONT: HANDLE
  HGDIOBJ: HANDLE
  HGLOBAL: HANDLE
  HHOOK: HANDLE
  HICON: HANDLE
  HINSTANCE: HANDLE
  HKEY: HANDLE
  HKL: HANDLE
  HLOCAL: HANDLE
  HMENU: HANDLE
  HMETAFILE: HANDLE
  HMODULE: HINSTANCE
  HMONITOR: HANDLE
  HPALETTE: HANDLE
  HPEN: HANDLE
  HRESULT: number
  HRGN: HANDLE
  HRSRC: HANDLE
  HSZ: HANDLE
  HWINEVENTHOOK: HANDLE
  HWINSTA: HANDLE
  HWND: HANDLE
  INT: number
  INT_PTR: PTR_Addr
  INT8: number
  INT16: number
  INT32: number
  INT64: BigIntStr

  /**
   * `uint32` or `uint64` used as value usage (memory address) instead of PVOID (Buffer),
   * Use `HANDLE` (number) for params defintion of the api,
   * @see https://stackoverflow.com/questions/18266626/what-is-the-range-of-a-windows-handle-on-a-64-bits-application/29526711#29526711
   */
  HANDLE: PTR_Addr
  LONG_PTR: PTR_Addr
  POINT: POINT
  ULONG_PTR: PTR_Addr

  WCHAR: number
  WCHAR_String: string
  WORD: number

}
/**
 * Struct element has functions properts like ref(), defef()
 */
export type DataType<T = WinDataType> = {
  [K in keyof T]: T[K] extends object ? (StructInstanceBase & T[K]) : T[K]
}

// declare const foo: DataType['POINT']
// export const bar = foo.ref()

