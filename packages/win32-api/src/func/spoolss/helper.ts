// eslint-disable-next-line import/no-extraneous-dependencies
import ref from 'ref-napi'

import {
  DllNames,
  DStruct as DS,
  DModel as M,
} from '../../index.js'
import { Spoolss as DLL } from '../../index.promise.js'


export {
  M, DS, ref,
}

export const dllName = DllNames.spoolss
export type Win32Fns = DLL.Win32Fns

