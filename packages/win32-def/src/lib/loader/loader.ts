import assert from 'node:assert'

import koffi from 'koffi'

import { Def } from '../def.enum.js'
import {
  AsyncSyncFuncModel,
  DllFuncsModel,
  ExpandFnModel,
  PromiseFnModel,
} from '../ffi.types.js'
import { LoadOptions } from '../types.js'

import { callFnAsync, gen_api_opts, parse_settings, prepareDllFile, registerFunction } from './loader.helper.js'


export const isArch64 = process.arch.includes('64')

export const defGroupNumber: Def[] = [
  Def.float, Def.int16, Def.int32, Def.int64, Def.int8,
  Def.uint16, Def.uint32, Def.uint64, Def.uint8,
  Def.long, Def.ulong, Def.longlong, Def.ulonglong,
]

export const defGroupPointer: Def[] = [
  Def.boolPtr, Def.bytePtr, Def.charPtr, Def.intPtr, Def.int8Ptr,
  Def.int16Ptr, Def.int32Ptr, Def.int64Ptr, Def.floatPtr,
  Def.longPtr, Def.uintPtr, Def.uint8Ptr,
  Def.intPtrPtr, Def.uint16Ptr, Def.uint32Ptr, Def.uint64Ptr,
  Def.ulonglongPtr, Def.voidPtr,
  Def.uintPtrPtr, Def.uint16PtrPtr, Def.uint32PtrPtr, Def.uint64PtrPtr,
  Def.ulonglongPtrPtr, Def.voidPtrPtr,
]

export function load<T>(options: LoadOptions<T>): T {
  const { dll, dllFuncs, usedFuncNames, settings } = options

  const libName = dll.endsWith('.drv')
    ? prepareDllFile(dll)
    : dll

  const lib = koffi.load(libName)

  const st = parse_settings(settings)
  const ps = gen_api_opts<T>(dllFuncs, usedFuncNames)

  assert(dllFuncs)
  const inst = {} as T

  for (const [name, params] of Object.entries(ps)) {
    const func = registerFunction({
      lib,
      name,
      // @ts-expect-error ignore T
      params,
      convention: st.convention,
    })

    Object.defineProperty(inst, name, {
      enumerable: true,
      value: func,
    })
  }

  return inst
}


export function loadAsync<T>(options: LoadOptions<T>): PromiseFnModel<T> {
  const inst = load<ExpandFnModel<DllFuncsModel>>(options)
  assert(inst)

  const instAsync = {} as PromiseFnModel<T>
  Object.entries(inst).forEach(([name, value]) => {
    if (! Object.hasOwn(inst, name)) { return }
    if (typeof value !== 'function') {
      Object.defineProperty(instAsync, name, {
        enumerable: false,
        writable: true,
        configurable: true,
        value,
      })
    }
    const fnAsync = new Proxy(value, {
      // @ts-ignore
      apply(target: AsyncSyncFuncModel, ctx: unknown, args: unknown[]) {
        // console.info({ target, ctx, args })
        return callFnAsync(target, args)
      },
    })
    Object.defineProperty(instAsync, name, {
      enumerable: false,
      writable: true,
      configurable: true,
      value: fnAsync,
    })

  })

  return instAsync
}
