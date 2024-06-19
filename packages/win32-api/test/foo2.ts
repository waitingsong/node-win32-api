import koffi from 'koffi'


const user32 = koffi.load('user32.dll')

// const FindWindowEx = user32.func('FindWindowExW', 'int', ['int', 'int', 'str16', 'str16'])
const FindWindowEx = user32.func('FindWindowExW', 'int', ['int', 'int', 'int16*', 'int16*'])
const GetWindowThreadProcessId = user32.func('GetWindowThreadProcessId', 'int', ['int', 'int16*'])
const GetWindowTextW = user32.func('GetWindowTextW', 'int', ['int', 'uint16*', 'int'])
// const GetWindowTextW = user32.func('GetWindowTextW', 'int', ['int', 'str16', 'int'])

for (let hwnd = 0; ;) {
  // hwnd = FindWindowEx(0, hwnd, 'Chrome_WidgetWin_1', null)
  // hwnd = FindWindowEx(0, hwnd, 'Notepad', null)
  // hwnd = FindWindowEx(0, hwnd, Buffer.from('Notepad', 'ucs2'), null)
  // hwnd = FindWindowEx(0, hwnd, Buffer.from('Notepad', 'ucs2'), '无标题 - 记事本')
  // hwnd = FindWindowEx(0, hwnd, Buffer.from('Notepad', 'ucs2'), Buffer.from('无标题 - 记事本', 'ucs2'))
  // hwnd = FindWindowEx(0, hwnd, 'Notepad', '无标题 - 记事本')
  // hwnd = FindWindowEx(0, hwnd, 'ApplicationFrameWindow', null)
  hwnd = FindWindowEx(0, hwnd, 'ApplicationFrameWindow', '计算器')
  // hwnd = FindWindowEx(0, hwnd, null, '计算器')

  // hwnd = await new Promise((resolve, reject) => {
  //   FindWindowEx.async(0, hwnd, Buffer.from('Notepad', 'ucs2'), Buffer.from('无标题 - 记事本', 'ucs2'), (err, ret) => {
  //     if (err) { reject(err) }
  //     else { resolve(ret) }
  //   })
  // })

  if (! hwnd) {
    console.log('No more windows')
    break
  }

  const ptr = Buffer.alloc(8)
  const tid = GetWindowThreadProcessId(hwnd, ptr)
  if (! tid) {
    // Maybe the process ended in-between?
    continue
  }
  const pid = ptr.readUInt32LE()

  let title
  // const buf2 = Buffer.alloc(1024)
  const buf = Buffer.allocUnsafe(1024)
  const length = GetWindowTextW(hwnd, buf, buf.length)
  if (! length) {
    // Maybe the process ended in-between?
    continue
  }

  const txt = buf.toString('ucs2', 0, length * 2)

  console.log({ hwnd, tid, PID: pid, Title: txt, length })
}
