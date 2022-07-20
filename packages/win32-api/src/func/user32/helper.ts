import { DllNames } from '../../index.js'
import { User32 as DLL } from '../../index.promise.js'


export const dllName = DllNames.user32
export type Win32Fns = DLL.Win32Fns

