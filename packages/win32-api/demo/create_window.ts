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

import * as ffi from 'ffi-napi'
import * as ref from 'ref-napi'
import * as StructDi from 'ref-struct-di'

// import {
//   C,
//   Config,
//   DModel as M,
//   DStruct as DS,
//   DTypes as W,
//   FModel as FM,
//   K,
//   U,
// } from 'win32-api' // as module
import {
  C,
  // Config,
  DModel as M,
  DStruct as DS,
  DTypes as W,
  // K,
  U,
} from '../src/index' // as local

const Struct = StructDi(ref)

// const knl32 = K.load()
const user32 = U.load()  // load all apis defined in lib/{dll}/api from user32.dll
const comctl32 = C.load()  // load all apis defined in lib/{dll}/api from user32.dll

// WndProc
const WndProc = ffi.Callback(
  W.UINT32,
  [W.HWND, W.UINT, W.WPARAM, W.LPARAM],
  (hwnd: M.HWND, uMsg: M.UINT, wParam: M.WPARAM, lParam: M.LPARAM) => {
    console.info('WndProc callback: ', uMsg, wParam, lParam)
    let result = 0
    switch (uMsg) {
      default:
        result = user32.DefWindowProcW(hwnd, uMsg, wParam, lParam)
        break
    }
    console.info('Sending LRESULT: ' + result + '\n')
    return result
  },
)

createWindow('Node.js new window')

// message loop
const msg = new Struct(DS.MSG)()
const point: M.POINT_Struct = new Struct(DS.POINT)()

msg.pt = point.ref()

let count = 0
const countLimit = 500
const start = new Date().getTime()
const ttl = 30 // sec

while (count < countLimit && user32.GetMessageW(msg.ref(), null, 0, 0)) {
  count++
  console.info('---------- count: ' + count + ' ------------')

  const end = new Date().getTime()
  const delta = end - start
  if (delta > ttl * 1000) {
    console.info(`timeout and exit. count: ${count}`)
    console.info(`elp ${delta}ms`)
    process.exit(0)
  }
  else if (count >= countLimit) {
    console.info('countLimit and exit.')
    console.info(`elp ${delta}ms`)
    process.exit(0)
  }

  user32.TranslateMessageEx(msg.ref())
  user32.DispatchMessageW(msg.ref())
}

// avoid gc
process.on('exit', () => {
  console.info('typeof WndProc is ' + typeof WndProc)
  console.info(`${count} loops`)
})


function createWindow(title: string): M.HWND {
  const className = Buffer.from('NodeClass\0', 'ucs2')
  const windowName = Buffer.from('Node.js WinForms App\0', 'ucs2')

  // Common Controls
  const icc: M.INITCOMMONCONTROLSEX_Struct = new Struct(DS.INITCOMMONCONTROLSEX)()
  icc.dwSize = 8
  icc.dwICC = 0x40ff
  comctl32.InitCommonControlsEx(icc.ref())

  // Window Class
  const wClass: M.WNDClASSEX_Struct = new Struct(DS.WNDCLASSEX)()

  wClass.cbSize = wClass.ref().byteLength
  wClass.style = 0
  wClass.lpfnWndProc = WndProc
  wClass.cbClsExtra = 0
  wClass.cbWndExtra = 0
  wClass.hInstance = ref.NULL
  wClass.hIcon = ref.NULL
  wClass.hCursor = ref.NULL
  wClass.hbrBackground = ref.NULL
  wClass.lpszMenuName = ref.NULL
  wClass.lpszClassName = className
  wClass.hIconSm = ref.NULL

  if (!user32.RegisterClassExW(wClass.ref())) {
    throw new Error('Error registering class')
  }
  // const dStyle = U.constants.WS_OVERLAPPEDWINDOW
  const dStyle = U.constants.WS_CAPTION | U.constants.WS_SYSMENU
  const hWnd = user32.CreateWindowExW(
    0,
    className,
    windowName,
    dStyle, // overlapped window
    U.constants.CW_USEDEFAULT,
    U.constants.CW_USEDEFAULT,
    600,
    400,
    ref.NULL,
    ref.NULL,
    ref.NULL,
    ref.NULL,
  )

  user32.ShowWindow(hWnd, 1)
  user32.UpdateWindow(hWnd)
  changeTitle(hWnd, title)

  return hWnd
}


function changeTitle(hWnd: Buffer, title: string): string {
  if (hWnd && !ref.isNull(hWnd) && ref.address(hWnd)) {
    // Change title of the Calculator
    const res = user32.SetWindowTextW(hWnd, Buffer.from(title + '\0', 'ucs2'))

    if (!res) {
      console.error('failed with', res)
      return ''
    }
    else {
      // const tt = getTitle(handle)
      return ''
    }
  }
  else {
    return ''
  }
}
