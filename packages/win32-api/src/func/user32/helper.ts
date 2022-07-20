// eslint-disable-next-line import/no-extraneous-dependencies
import ref from 'ref-napi'

import { DllNames } from '../../index.js'
import { User32 as DLL } from '../../index.promise.js'


export { DModel as M } from '../../index.js'
export { ref }

export const dllName = DllNames.user32
export type Win32Fns = DLL.Win32Fns

