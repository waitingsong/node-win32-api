/* eslint-disable import/no-extraneous-dependencies */
import ref from 'ref-napi'
import StructDi from 'ref-struct-di'
import UnionDi from 'ref-union-di'

import { LPMSG, LPSTR, LPTSTR, LPWORD, LPWSTR } from './common.def.js'
import { Def } from './def.enum.js'
import { StructDefType, StructTypeConstructor } from './ffi.types.js'
import { wcharBuffer } from './fixed-buffer.js'


// const UnionDi = _UnionDi
const Union = UnionDi(ref)
export function UnionType<T extends StructDefType>(input: T): StructTypeConstructor<T> {
  // @ts-ignore
  return Union(input)
}
export function UnionFactory<T>(input: StructDefType): T {
  // @ts-ignore
  return new Union(input)() as unknown as T
}

export const defaultStructCharOptions: Required<StructCharOptions> = {
  useStringBuffer: true,
  maxCharLength: 1024,
  CharDefs: [
    LPMSG,
    LPSTR,
    LPWSTR,
    LPTSTR,
    LPWORD,
  ],
}

const Struct = StructDi(ref)
export function StructType<T extends StructDefType>(
  input: T,
  options?: StructCharOptions,
): StructTypeConstructor<T> {

  const initType = genInitTyp(input, options)
  // @ts-ignore
  return Struct(initType)
}
export function StructFactory<T>(input: StructDefType, options?: StructCharOptions): T {
  const initType = genInitTyp(input, options)
  // @ts-ignore
  return new Struct(initType)() as unknown as T
}

function genInitTyp(input: StructDefType, options?: StructCharOptions): StructDefType {
  const opts: Required<StructCharOptions> = {
    ...defaultStructCharOptions,
    ...options,
  }

  const initType = {} as StructDefType
  Object.entries(input).forEach(([key, value]) => {
    if (opts.useStringBuffer
      && typeof value === 'string'
      && opts.CharDefs.includes(value)) {

      initType[key] = wcharBuffer(opts.maxCharLength)
    }
    else {
      // @TODO recursive convertion
      initType[key] = value
    }
  })

  return initType
}

export interface StructCharOptions {
  /**
   * @default true
   * @description convert property of Struct from POINTER(like LPSTR, LPWSTR) to StringBuffer,
   * **Note: typeof value may be WCHAR_String instead of _POINTER**
   */
  useStringBuffer?: boolean
  /**
   * @default 1024
   */
  maxCharLength?: number
  /**
   * @default [LPMSG, LPSTR, LPWSTR, LPTSTR, LPWORD ]
   */
  CharDefs?: Def[]
}

