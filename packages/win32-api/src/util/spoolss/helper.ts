// eslint-disable-next-line import/no-extraneous-dependencies
import ref from 'ref-napi'

import {
  DllNames,
  Types as M,
} from '../../index.js'
import { Spoolss as DLL } from '../../index.promise.js'
import * as S from 'win32-def/struct'



export {
  M, S, ref,
}

export const dllName = DllNames.spoolss
export type Win32Fns = DLL.Win32Fns

