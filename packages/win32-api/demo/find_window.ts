/**
 * Find the calc window opened manually
 *
 * Run @CLI and then move mouse inside area of the window
 *
 * @CLI `ts-node -P tsconfig.cjs.json demo/find_window.ts`
 * @author waiting
 * @link https://github.com/waitingsong/node-win32-api
 */

import * as ref from 'ref-napi'

import {
  U,
} from '../src/index' // as local


const user32 = U.load()

const lpszClass = Buffer.from('CalcFrame\0', 'ucs2')
const hWnd = user32.FindWindowExW(null, null, lpszClass, ref.NULL)

if (typeof hWnd === 'number' && hWnd > 0) {
  console.info('success, number: ', hWnd)
}
else if (Buffer.isBuffer(hWnd) && !ref.isNull(hWnd)) {
  console.info('success, address: ', ref.address(hWnd))
}
else {
  console.error('failed')
  process.exit(1)
}

