/**
 * Find the calc window opened manually
 *
 * Run @CLI and then move mouse inside area of the window
 *
 * @CLI `ts-node -P tsconfig.cjs.json demo/knl_GetMOduleHandleExW.ts`
 * @author waiting
 * @link https://github.com/waitingsong/node-win32-api
 */

import * as ref from 'ref-napi'

import {
  K,
  DTypes as W,
} from '../src/index' // as local


const knl32 = K.load()

const lpszClass = Buffer.from('guard64\0', 'ucs2')
// 'uint64*' under x64, 'uint32*' under ia32
const hInstanceBuffer = ref.alloc(W.HANDLE_PVOID)
const hInstanceAddr = ref.address(hInstanceBuffer)

knl32.GetModuleHandleExW(0, lpszClass, hInstanceAddr)
// <Buffer@0x00000094D3968EC0 00 00 a4 60 ff 7f 00 00, type: { indirection: 2, name: 'uint64*' }>
console.log(hInstanceBuffer)
console.log(hInstanceBuffer.readInt32LE(0)) // -> 1621360640 (60A40000)
console.log(hInstanceBuffer.readBigUInt64LE()) // -> 140734814748672n (7FFF60A40000)


const lpszClassK32 = Buffer.from('kernel32\0', 'ucs2')
const lpszClassU32 = Buffer.from('user32\0', 'ucs2')
const size = process.arch === 'x64' ? 8 : 4
const buf = Buffer.alloc(size)
const bufAddr = ref.address(buf)

knl32.GetModuleHandleExW(0, lpszClassK32, bufAddr)
console.log(buf) // -> <Buffer@0x000000801A3E3C40 00 00 a1 63 ff 7f 00 00>
knl32.GetModuleHandleExW(0, lpszClassU32, bufAddr)
console.log(buf) // -> <Buffer@0x000000801A3E3C40 00 00 4c 63 ff 7f 00 00>


// setTimeout(() => {
//   process.exit(0)
// }, 60000);

