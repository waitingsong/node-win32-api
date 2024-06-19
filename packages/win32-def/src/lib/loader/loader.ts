import assert from 'node:assert'

import koffi from 'koffi'

import { CallingConvention } from '../ffi.types.js'
import { LoadOptions, KoffiFunction, LibFuncs } from '../types.js'

import { gen_api_opts, parse_settings, prepareDllFile, registerFunction } from './loader.helper.js'


export function load<T extends object>(options: LoadOptions<T>): LibFuncs<T> {
  const inst = regFunc<T>(options)
  return inst
}

function regFunc<T extends object>(options: LoadOptions<T>): LibFuncs<T> {
  const { dll, dllFuncs, usedFuncNames, settings } = options

  const libName = dll.endsWith('.drv')
    ? prepareDllFile(dll)
    : dll

  const lib = koffi.load(libName)

  const st = parse_settings(settings)
  const ps = gen_api_opts<T>(dllFuncs, usedFuncNames)

  assert(dllFuncs)
  const inst = {} as LibFuncs<T>

  for (const [name, params] of Object.entries(ps)) {
    const func = registerFunction({
      lib,
      name,
      // @ts-expect-error ignore unknown
      params,
      convention: st.convention ?? CallingConvention.Cdecl,
    })

    const nameSync = `${name}Sync`
    bindSyncOnInst(inst, nameSync, func)

    const nameAsync = name
    bindAsyncOnInst(inst, nameAsync, func)
  }

  return inst
}

function bindSyncOnInst<T>(inst: T, name: string, fn: KoffiFunction): void {
  Object.defineProperty(inst, name, {
    enumerable: true,
    value: fn,
  })
}

function bindAsyncOnInst<T>(inst: T, name: string, fn: KoffiFunction): void {
  Object.defineProperty(inst, name, {
    enumerable: true,
    value: (args: unknown[]) => callFnAsync(fn, args),
  })
}

function callFnAsync(fn: KoffiFunction, args: unknown[]) {
  return new Promise<unknown>((done, reject) => {
    const asyncCallback = (err: Error | undefined, result: unknown) => {
      if (err) {
        reject(err)
        return
      }
      done(result)
    }
    fn.async(...args, asyncCallback)
  })
}


