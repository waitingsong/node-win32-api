import { resolve } from 'node:path'

import koffi from 'koffi'


const user32 = koffi.load('user32.dll')

// const FindW = lib.func('__stdcall', 'FindWindowW', 'int', ['str', 'str'])
// const FindW = user32.func('FindWindowW', 'int', ['str', 'str'])

// // let ret = FindW('Calculator', '')
// let ret = FindW('Chrome_WidgetWin_1', null)

// console.log('ret', ret)


const DWORD = koffi.alias('DWORD', 'uint32_t')
const HANDLE = koffi.pointer('HANDLE', koffi.opaque())
const HWND = koffi.alias('HWND', HANDLE)

const FindWindowEx = user32.func('HWND FindWindowExW(HWND hWndParent, HWND hWndChildAfter, const char16_t *lpszClass, const char16_t *lpszWindow)')
// const FindWindowEx = user32.func('__stdcall', 'FindWindowW', 'int', ['int', 'int', 'str', 'str'])

const GetWindowThreadProcessId = user32.func('DWORD __stdcall GetWindowThreadProcessId(HWND hWnd, _Out_ DWORD *lpdwProcessId)')

// GetWindowTextW: [W.INT, [W.HWND, W.LPTSTR, W.INT] ],
const GetWindowText = user32.func('int __stdcall GetWindowTextW(HWND hWnd, _Out_ uint16_t *lpString, int nMaxCount)')

for (let hwnd = null; ;) {
  // hwnd = FindWindowEx(0, hwnd, 'Chrome_WidgetWin_1', null)
  // hwnd = FindWindowEx(0, hwnd, 'Notepad', null)
  // hwnd = FindWindowEx(0, hwnd, 'ApplicationFrameWindow', null)
  hwnd = FindWindowEx(0, hwnd, null, '计算器')
  if (! hwnd) {
    console.log('No more windows')
    break
  }
  console.log({ hwnd })

  // Get PID
  let pid
  const ptr = [null]
  const tid = GetWindowThreadProcessId(hwnd, ptr)
  if (! tid) {
    // Maybe the process ended in-between?
    continue
  }
  pid = ptr[0]
  // Get window title

  let title
  const buf = Buffer.alloc(1024)
  // const buf = Buffer.allocUnsafe(128)
  const length = GetWindowText(hwnd, buf, buf.length)
  if (! length) {
    // Maybe the process ended in-between?
    continue
  }

  // split buf at first null byte
  const txt = buf.toString('ucs2', 0, length * 2)

  // const txt = buf.toString('ucs2')
  // .replace(/\0+/ug, '').trim()
  // .replace(/\s+/ug, ' ')
  // console.log(txt)

  // convert buf to utf8 string

  title = koffi.decode(buf, 'char', length)
  console.log({ tid, PID: pid, Title: txt, length })

}
