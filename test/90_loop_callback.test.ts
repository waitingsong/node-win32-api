/// <reference types="node" />
/// <reference types="mocha" />

import {
  basename,
} from '@waiting/shared-core'
import * as assert from 'power-assert'
import { interval, of } from 'rxjs'
import {
  concatMap,
  delay,
  finalize,
  switchMap,
  take,
  tap,
  timeout,
} from 'rxjs/operators'
import { DModel as M } from 'win32-def'

import { changeTitle, createWindow, createWndProc, destroyWin } from './helper'


const filename = basename(__filename)

describe(filename, () => {
  it('Should WndProc works at more loops', done => {
    const loops = 1024
    const titlePrefix = 'win32-api-'
    const wndProc: M.WNDPROC = createWndProc()
    process.on('exit', () => {
      // tslint:disable-next-line:no-unused-expression
      wndProc // avoid gc
    })

    let handle: M.HWND
    const handle$ = createWindow(wndProc).pipe(
      tap(hWnd => {
        handle = hWnd
      }),
      delay(1500),
    )
    const range$ = interval(10).pipe(
      take(loops),
    )
    const start = new Date().getTime()

    handle$.pipe(
      switchMap(hWnd => {
        return range$.pipe(
          concatMap(index => {
            const newTitle = titlePrefix + index
            changeTitle(hWnd, newTitle)
            return of(index)
          }),
        )
      }),
      timeout(50_000),
      finalize(() => {
        handle && destroyWin(handle)
        // for next testing
        setTimeout(() => {
          done()
        }, 1000)
      }),
    )
      .subscribe(
        index => {
          assert(index + 1 <= loops, `index(${index}) exceed loops(${loops})`)
        },
        err => assert(false, err),
        () => {
          const end = new Date().getTime()
          const delta = end - start
          console.info(`elp ${delta}ms at ${loops} loops`)
        },
      )

  })
})
