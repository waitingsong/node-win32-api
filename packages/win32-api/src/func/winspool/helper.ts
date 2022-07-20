// eslint-disable-next-line import/no-extraneous-dependencies
import ref from 'ref-napi'

import { DllNames } from '../../index.js'
import { Winspool as DLL } from '../../index.promise.js'


export { ref }

export const dllName = DllNames.winspool
export type Win32Fns = DLL.Win32Fns

