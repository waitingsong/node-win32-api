import * as assert from 'assert'
import { spawn } from 'child_process'
import { basename } from 'path'

import { U } from '../src/index'

import { calcLpszWindow } from './config.unittest'
import { user32 } from './helper'


const filename = basename(__filename)

describe(filename, () => {
  it('Open a calc.exe and find it\'s window hWnd', (done) => {
    const child = spawn('calc.exe')

    setTimeout(() => {
      user32.FindWindowExW.async(0, 0, null, calcLpszWindow, (err, hWnd) => {
        if (err) {
          assert(false, err.message)
          child.kill()
          done()
          return
        }

        if (typeof hWnd === 'number' && hWnd > 0
          || typeof hWnd === 'bigint' && hWnd > 0
          || typeof hWnd === 'string' && hWnd.length > 0
        ) {
          assert(true)
        }
        else {
          assert(false, 'found no calc window')
        }

        child.kill()
        done()
      })
    }, 1500)
  })

  it('Open a calc.exe and find it\'s window hWnd', (done) => {
    const child = spawn('calc.exe')

    setTimeout(() => {
      user32.FindWindowExW.async(0, 0, null, calcLpszWindow, (err, hWnd) => {
        if (err) {
          assert(false, err.message)
          child.kill()
          done()
          return
        }

        if (typeof hWnd === 'number' && hWnd > 0
          || typeof hWnd === 'bigint' && hWnd > 0
          || typeof hWnd === 'string' && hWnd.length > 0
        ) {
          assert(true)
        }
        else {
          assert(false, 'found no calc window')
        }

        child.kill()
        done()
      })

    }, 1500)
  })


  it('Open a calc.exe and change it\'s window title', (done) => {
    const child = spawn('calc.exe')

    setTimeout(() => {
      findNSetWinTitleAsync()
        .then(() => {
          child.kill()
          done()
        })
        .catch((err) => {
          child.kill()
          assert(false, err)
          done()
        })
    }, 1500)
  })


  it('Open a calc.exe and change it\'s window title with partial loading', (done) => {
    const child = spawn('calc.exe')

    setTimeout(() => {
      findNSetWinTitleAsyncPartial()
        .then(() => {
          child.kill()
          done()
        })
        .catch((err) => {
          assert(false, err)
          child.kill()
          done()
        })

    }, 1000)
  })

})


function findNSetWinTitleAsync(): Promise<void> {
  return new Promise((resolve, reject) => {

    user32.FindWindowExW.async(0, 0, null, calcLpszWindow, (err, hWnd) => {
      if (err) {
        return reject(err.message)
      }

      if (typeof hWnd === 'number' && hWnd > 0
        || typeof hWnd === 'bigint' && hWnd > 0
        || typeof hWnd === 'string' && hWnd.length > 0
      ) {
        const title = 'Node-Calculator'
        user32.SetWindowTextW.async(hWnd, Buffer.from(title + '\0', 'ucs2'), (err2, res) => {
          if (err2) {
            return reject(err2.message)
          }
          else if (! res) {
            return reject('SetWindowTextW() failed')
          }

          const buf = Buffer.alloc(title.length * 2)
          user32.GetWindowTextW.async(hWnd, buf, buf.byteLength, (err3) => {
            if (err3) {
              return reject(err3.message)
            }
            const str = buf.toString('ucs2').replace(/\0+$/, '')
            if (str !== title.trim()) {
              return reject(`title should be changed to "${title}", bug got "${str}"`)
            }
            resolve()
          })
        })
      }
      else {
        reject('found no calc window')
      }
    })
  })
}


function findNSetWinTitleAsyncPartial(): Promise<void> {
  return new Promise((resolve, reject) => {
    const u32 = U.load(['FindWindowExW', 'SetWindowTextW'])

    // u32.FindWindowExW.async(0, 0, lpszClass, null, (err, hWnd) => {
    u32.FindWindowExW.async(0, 0, null, calcLpszWindow, (err, hWnd) => {
      if (err) {
        return reject(err.message)
      }

      if (typeof hWnd === 'number' && hWnd > 0
        || typeof hWnd === 'bigint' && hWnd > 0
        || typeof hWnd === 'string' && hWnd.length > 0
      ) {
        const title = 'Node-Calculator'
        // Change title of the Calculator
        u32.SetWindowTextW.async(hWnd, Buffer.from(title + '\0', 'ucs2'), (err2) => {
          if (err2) {
            return reject(err2.message)
          }

          const buf = Buffer.alloc(title.length * 2)
          u32.GetWindowTextW.async(hWnd, buf, buf.byteLength, (err3) => {
            if (err3) {
              return reject(err3.message)
            }

            const str = buf.toString('ucs2').replace(/\0+$/, '')
            if (str !== title) {
              return reject(`title should be changed to ${title}, bug got ${str}`)
            }
            resolve()
          })
        })
      }
      else {
        return reject('FindWindowExW() failed')
      }
    })
  })
}
