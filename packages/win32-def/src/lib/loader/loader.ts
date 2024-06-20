import assert from 'node:assert'

import koffi from 'koffi'

import { CallingConvention } from '../ffi.types.js'
import { LoadOptions, KoffiFunction, IKoffiLib, LibFuncs } from '../types.js'

import { createStructFromFuncDefList, gen_api_opts, parse_settings, registerFunction } from './loader.helper.js'


const cacheLibMap = new Map<string, IKoffiLib>()

function getLibFromCache(dll: string): IKoffiLib | undefined {
  return cacheLibMap.get(dll)
}
function setLibToCache(dll: string, lib: IKoffiLib): void {
  cacheLibMap.set(dll, lib)
}

export function load<T extends object>(options: LoadOptions<T>): LibFuncs<T> {
  const { dll, dllFuncs, usedFuncNames, settings } = options

  // const libName = dll.endsWith('.drv')
  //   ? prepareDllFile(dll)
  //   : dll
  const libName = dll

  const st = parse_settings(settings)
  const ps = gen_api_opts<T>(dllFuncs, usedFuncNames)

  assert(dllFuncs)
  const inst = { } as LibFuncs<T>

  let lib = getLibFromCache(libName)
  if (! lib) {
    lib = koffi.load(libName)
    Object.defineProperty(inst, 'unload', {
      enumerable: false,
      value: () => {
        lib?.unload()
        cacheLibMap.delete(libName)
      },
    })
    setLibToCache(libName, lib)
  }

  if (st.autoCreateStruct) {
    createStructFromFuncDefList(ps)
  }

  for (const [name, params] of Object.entries(ps)) {
    const func = registerFunction({
      lib,
      name,
      // @ts-expect-error ignore unknown
      params,
      convention: st.convention ?? CallingConvention.Cdecl,
    })

    bindMethods(inst, name, func)
  }

  return inst
}


function bindMethods<T>(inst: T, name: string, fn: KoffiFunction): void {
  const nameSync = name
  Object.defineProperty(inst, nameSync, {
    enumerable: true,
    value: fn,
  })

  const nameAsync = `${name}Async`
  Object.defineProperty(inst, nameAsync, {
    enumerable: true,
    value: (...args: unknown[]) => callFnAsync(fn, args),
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

