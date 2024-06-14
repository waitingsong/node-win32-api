/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import assert from 'node:assert'

import { genCurrentDirname } from '@waiting/shared-core'
import ffi from '@lwahonen/ffi-napi'
import ref from '@lwahonen/ref-napi'
import StructDi from 'ref-struct-di'
import UnionDi from 'ref-union-di'
import { $ } from 'zx'

import {
  DModel as M,
  DTypes as W,
  DStruct as DS,
  K,
  StructFactory,
  U,
} from '../src/index.js'
import {
  Kernel32,
  User32,
  Comctl32,
  Gdi32,
  Winspool,
} from '../src/index.promise.js'


export const Struct = StructDi(ref)
export type StructDiType = typeof Struct
export const Union = UnionDi(ref)

export const comctl32 = Comctl32.load()
export const gdi32 = Gdi32.load()
export const knl32 = Kernel32.load()
export const knl32Sync = K.load()
export const user32 = User32.load()
export const user32Sync = U.load()
export const winspool = Winspool.load()

/** WndProc */
export function createWndProc(): M.WNDPROC {
  const WndProc = ffi.Callback(
    W.UINT32,
    [W.HWND, W.UINT, W.WPARAM, W.LPARAM],
    (hwnd: M.HWND, uMsg: M.UINT, wParam: M.WPARAM, lParam: M.LPARAM) => {
      // console.info('WndProc callback: ', uMsg, wParam, lParam)
      let result = 0
      switch (uMsg) {
        default:
          result = user32Sync.DefWindowProcW(hwnd, uMsg, wParam, lParam)
          break
      }
      // console.info('Sending LRESULT: ' + result + '\n')
      return result
    },
  )

  // process.on('exit', () => {
  //   typeof WndProc // avoid gc
  // })

  return WndProc
}

export async function createWindow(wndProc: M.WNDPROC): Promise<M.HWND> {
  const className = Buffer.from('NodeClass\0', 'ucs2')
  const windowName = Buffer.from('Node calc\0', 'ucs2')

  // Common Controls
  const icc = StructFactory<M.INITCOMMONCONTROLSEX>(DS.INITCOMMONCONTROLSEX)
  icc.dwSize = 8
  icc.dwICC = 0x40ff
  await comctl32.InitCommonControlsEx(icc.ref())

  // @DEBUG
  // const wc = DS.WNDCLASSEX
  // const wparm = W.WPARAM
  // const lparm = W.LPARAM
  // Window Class
  const wClass = StructFactory<M.WNDCLASSEX>(DS.WNDCLASSEX)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  wClass.cbSize = wClass.ref().byteLength
  wClass.style = 0
  wClass.lpfnWndProc = wndProc
  wClass.cbClsExtra = 0
  wClass.cbWndExtra = 0
  wClass.hInstance = 0
  wClass.hIcon = 0
  wClass.hCursor = 0
  wClass.hbrBackground = 0
  wClass.lpszMenuName = ref.NULL
  wClass.lpszClassName = className
  wClass.hIconSm = 0

  if (! user32Sync.RegisterClassExW(wClass.ref())) {
    throw new Error('Error registering class')
  }
  // const dStyle = U.constants.WS_OVERLAPPEDWINDOW
  const dStyle = U.constants.WS_CAPTION | U.constants.WS_SYSMENU
  const hWnd: M.HWND = await user32.CreateWindowExW(
    0,
    className,
    windowName,
    dStyle, // overlapped window
    U.constants.CW_USEDEFAULT,
    U.constants.CW_USEDEFAULT,
    600,
    400,
    0,
    0,
    0,
    ref.NULL,
  )

  assertsHwnd(hWnd)

  // @FIXME timeout
  // await user32.ShowWindow(hWnd, 1)
  await user32.UpdateWindow(hWnd)

  return hWnd
}

export async function changeTitle(hWnd: M.HANDLE, title: string): Promise<string> {
  if (typeof hWnd === 'number' && hWnd > 0) {
    // Change title of the Calculator
    const res = await user32.SetWindowTextW(hWnd, Buffer.from(title + '\0', 'ucs2'))
    if (res) {
      const tt = await getTitle(hWnd)
      return tt
    }
    throw new Error('changeTitle failed')
  }
  else if (Buffer.isBuffer(hWnd) && ! ref.isNull(hWnd) && ref.address(hWnd)) {
    // Change title of the Calculator
    const res = await user32.SetWindowTextW(hWnd, Buffer.from(title + '\0', 'ucs2'))
    if (res) {
      const tt = await getTitle(hWnd)
      return tt
    }
    throw new Error('changeTitle failed')
  }
  return ''
}


export function changeTitleAsync(handle: M.HANDLE, title: string): Promise<string> {
  return Promise.resolve(changeTitle(handle, title))
}


export async function getTitle(handle: M.HANDLE): Promise<string> {

  const len = 127
  const buf = Buffer.alloc(len * 2)
  await user32.GetWindowTextW(handle, buf, len)
  const ret = buf.toString('ucs2').replace(/\0+$/u, '')
  return ret
}

export function destroyWin(hWnd: M.HWND): Promise<M.BOOL> {
  return user32.DestroyWindow(hWnd)
}


export function assertsHwnd(hWnd: M.HWND | string | number | bigint): void {
  if (typeof hWnd === 'string') {
    assert(hWnd.length > 0, 'found no window')
  }
  else if (typeof hWnd === 'number' || typeof hWnd === 'bigint') {
    assert(hWnd > 0, 'found no window')
  }
  else {
    assert(false, 'found no window')
  }
}
