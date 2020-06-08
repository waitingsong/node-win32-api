import { spawn } from 'child_process'
import { basename } from 'path'

import * as assert from 'power-assert'
import * as ref from 'ref-napi'
import {
  DModel as M,
  DStruct as DS,
  DTypes as W,
  FModel as FM,
} from 'win32-def'

import { CS } from '../../src/index'
import { user32, Struct, destroyWin } from '../helper'


const filename = basename(__filename)

describe(filename, () => {
  it('Should send WM_COMMAND and WM_DESTROY works', (done) => {
    const child = spawn('calc.exe')

    child.on('exit', (code) => {
      assert(code === 0)
      done()
    })
    child.on('error', (ex: Error) => {
      assert(false, ex.message)
    })

    setTimeout(() => {
      const lpszClass = Buffer.from('CalcFrame\0', 'ucs2')
      const hWnd = user32.FindWindowExW(0, 0, lpszClass, null)
      assert(hWnd > 0 || hWnd.toString().length > 0)

      let ret = user32.SendMessageW(hWnd, CS.WM_COMMAND, 1000, 3)
      assert(ret === 0)

      ret = user32.SendMessageW(hWnd, CS.WM_DESTROY, 0, 0)
      assert(ret === 0)

    }, 1500)
  })

  it('Should send WM_COPYDATA works', (done) => {
    const child = spawn('calc.exe')
    setTimeout(() => {
      const lpszClass = Buffer.from('CalcFrame\0', 'ucs2')
      const hWnd = user32.FindWindowExW(0, 0, lpszClass, null)
      assert(hWnd > 0 || hWnd.toString().length > 0)

      const copyData = new Struct(DS.COPYDATASTRUCT)() as M.COPYDATASTRUCT_Struct
      const msgBuff = Buffer.from('foo\0', 'ucs2')
      const msgBuffAddr = ref.address(msgBuff)
      copyData.dwData = msgBuffAddr
      const copyDataAddr = ref.address(copyData.ref())

      console.info({
        msgBuff, msgBuffAddr, copyData, copyDataAddr,
      })

      // send WM_COPYDATA (74) message
      const ret = user32.SendMessageW(hWnd, CS.WM_COPYDATA, 0, copyDataAddr)
      assert(ret === 0)

      destroyWin(hWnd)
      child.kill()
      done()
    }, 1500)
  })
})

