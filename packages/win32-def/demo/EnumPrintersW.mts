#!/usr/bin/env tsx
/* eslint-disable import/no-extraneous-dependencies */

import ffi from 'koffi'
import { PrinterEnumFlags } from 'win32-def/consts'
import * as D from 'win32-def/def'
import * as S from 'win32-def/struct'


console.info('Running EnumPrintersW()')

S.PRINTER_INFO_1_Factory()
// S.PRINTER_INFO_4_Factory()
// S.PRINTER_INFO_5_Factory()

const lib = ffi.load('winspool.drv')

const func1 = lib.func(
  'EnumPrintersW',
  D.BOOL,
  [D.DWORD, D.WString, D.DWORD, `_Out_ ${D.LPBYTE}`, D.DWORD, D.LPDWORD, D.LPDWORD],
)

const level = 1
const flags = PrinterEnumFlags.PRINTER_ENUM_LOCAL
const name = ''
const pcbNeeded = Buffer.alloc(4)
const pcReturned = Buffer.alloc(4)

const cbBuf = 4096
const buf = Buffer.alloc(cbBuf)

const ret1 = func1(
  flags,
  name,
  level,
  buf,
  cbBuf,
  pcbNeeded,
  pcReturned,
) as number

const count = pcReturned.readUInt32LE()
// const pcb = pcbNeeded.readUInt32LE()

const decodeType1 = `${S.PRINTER_INFO_1_Name}[${count}]`
const infoArr1 = ffi.decode(buf, decodeType1) as S.PRINTER_INFO_1_Type[]

console.info({ ret1, level, infoArr1 })

