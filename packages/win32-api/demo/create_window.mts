#!/usr/bin/env tsx
/* eslint-disable no-bitwise */
/* eslint-disable import/no-extraneous-dependencies */
/**
 * Create a window and receive events
 * window closed after 30sec if event triggered
 *
 * Run @CLI and then move mouse in the area of the window
 *
 * @CLI `ts-node -P tsconfig.cjs.json demo/create_window.ts`
 * @author waiting
 * @link https://github.com/waitingsong/node-win32-api
 */
import assert from 'assert'

import { sleep } from '@waiting/shared-core'
import { ffi, User32, Kernel32 } from 'win32-api'
import { CW_USEDEFAULT, WS_CAPTION, WS_SYSMENU } from 'win32-def/consts'
import * as D from 'win32-def/def'
import * as S from 'win32-def/struct'
import type * as T from 'win32-def/types'


const user32 = User32.load()
const libKnl = Kernel32.load()
assert(libKnl)
const hModule = libKnl.GetModuleHandleW(null)
assert(hModule)


const title = 'Node.js WinForms App'
const proc = ffi.proto('WndProc', D.LRESULT, [D.HWND, D.UINT, D.WPARAM, D.LPARAM])
const WndProc = ffi.register(jsCallback, ffi.pointer(proc))

try {
  const { clsAtom, winHwnd } = await createWindow(title)
  await sleep(1500)

  setTitle(winHwnd, `${title} - updated`)
  await sleep(1500)
  user32.UnregisterClassW(clsAtom, 0)
}
finally {
  ffi.unregister(WndProc)
  console.info('finish')
}



async function createWindow(winTitle: string): Promise<{ winHwnd: T.HWND, clsAtom: T.ATOM }> {
  const windowName = winTitle
  const className = 'NodeClass'

  // Common Controls
  const { payload: icc } = S.INITCOMMONCONTROLSEX_Factory()
  icc.dwICC = 0x40ff

  const { payload: wClass } = S.WNDCLASSEXW_Factory()
  wClass.lpszClassName = className
  wClass.lpfnWndProc = WndProc
  // https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getsyscolor
  wClass.hbrBackground = 13

  const atom = await user32.RegisterClassExW_Async(wClass)
  assert(atom, 'RegisterClassExW failed')

  const dStyle = WS_CAPTION | WS_SYSMENU
  try {
    const hWnd = user32.CreateWindowExW(
      0,
      className,
      windowName,
      dStyle, // overlapped window
      CW_USEDEFAULT,
      CW_USEDEFAULT,
      600,
      400,
      0,
      0,
      0,
      0,
    )
    assert(hWnd)

    // Don't use _Async
    user32.ShowWindow(hWnd, 1)
    user32.UpdateWindow(hWnd)

    return { winHwnd: hWnd, clsAtom: atom }
  }
  catch {
    user32.UnregisterClassW(atom, hModule)
    ffi.unregister(WndProc)
  }

  throw new Error('CreateWindowExW failed')
}


function setTitle(appHwnd: T.HWND, newTitle: string): void {
  // Don't use SetWindowTextW_Async
  const res = user32.SetWindowTextW(appHwnd, newTitle)
  assert(res, 'SetWindowTextW failed')
}


function jsCallback(hwnd: T.HWND, uMsg: T.UINT, wParam: T.WPARAM, lParam: T.LPARAM): T.LRESULT {
  console.info('WndProc callback: ', { uMsg, wParam, lParam })
  let result = 0
  switch (uMsg) {
    default:
      result = user32.DefWindowProcW(hwnd, uMsg, wParam, lParam)
      break
  }
  console.info(`Sending LRESULT: ${result}\n`)
  return result
}
