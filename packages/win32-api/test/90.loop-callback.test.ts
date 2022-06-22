import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'
import { interval, Observable, of } from 'rxjs'
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

import { changeTitle, createWindow, createWndProc, destroyWin } from './helper.js'


// Note: may crash
describe.skip(fileShortPath(import.meta.url), () => {

  it('Should WndProc works at more loops', (done) => {
    const loops = 16
    const titlePrefix = 'win32-api-'
    const wndProc: M.WNDPROC = createWndProc()

    let handle: M.HWND
    const handle$: Observable<M.HWND> = of(createWindow(wndProc)).pipe(
      tap((hWnd: M.HWND) => {
        handle = hWnd
      }),
      delay(1500),
    )
    const range$: Observable<number> = interval(500).pipe(
      take(loops),
    )
    const start = new Date().getTime()

    handle$.pipe(
      switchMap((hWnd: M.HWND) => {
        return range$.pipe(
          concatMap((index: number) => {
            assert(typeof index === 'number')
            const newTitle = titlePrefix + index.toString()
            changeTitle(hWnd, newTitle)
            return of(index)
          }),
        )
      }),
      timeout(50_000),
      finalize(() => {
        typeof wndProc // avoid gc
        handle && destroyWin(handle)
        // for next testing
        setTimeout(() => {
          done()
        }, 1000)
      }),
    )
      .subscribe(
        (index) => {
          assert(typeof index === 'number')
          assert(index + 1 <= loops, `index(${index}) exceed loops(${loops})`)
        },
        (err) => {
          throw err
        },
        () => {
          const end = new Date().getTime()
          const delta = end - start
          console.info(`elp ${delta}ms at ${loops} loops`)
        },
      )

  })
})

