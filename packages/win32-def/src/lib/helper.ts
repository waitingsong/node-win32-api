/* eslint-disable import/no-extraneous-dependencies */
import ref from 'ref-napi'
import StructDi from 'ref-struct-di'
import UnionDi from 'ref-union-di'

import { LPMSG, LPSTR, LPTSTR, LPWORD, LPWSTR } from './common.def.js'
import { WCHAR_String } from './common.types.js'
import { Def } from './def.enum.js'
import { StructDefType, StructTypeConstructor } from './ffi.types.js'
import { wcharBuffer } from './fixed-buffer.js'


export const bufferAlign = process.arch.includes('64') ? 8 : 4


// const UnionDi = _UnionDi
const Union = UnionDi(ref)
export function UnionType<T extends StructDefType>(input: T): StructTypeConstructor<T> {
  // @ts-expect-error
  return Union(input)
}
export function UnionFactory<T>(input: StructDefType): T {
  // @ts-expect-error
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
  // @ts-expect-error
  return Struct(initType)
}
export function StructFactory<T, UseStringBuffer extends boolean = true>(
  input: StructDefType,
  // options?: StructCharOptions & { useStringBuffer: UseStringBuffer | undefined },
  options?: StructCharOptions,
): StructFactoryReturnType<T, UseStringBuffer> {

  const initType = genInitTyp(input, options)
  // @ts-expect-error
  return new Struct(initType)() as unknown as StructFactoryReturnType<T, UseStringBuffer>
}

export type StructFactoryReturnType<T, O extends boolean> =
  O extends true
    ? PtrToWCHAR<T>
    : T

type PtrToWCHAR<T> = {
  [P in keyof T]: T[P] extends Buffer
    ? WCHAR_String
    : T[P]
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

