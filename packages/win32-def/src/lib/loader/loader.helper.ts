import assert from 'node:assert'

import { settingsDefault } from '../config.js'
import { Def } from '../def.enum.js'
import {
  type FuncDefList,
  type DllFuncsType,
  type FnDefName,
  type FnDefParams,
  type LoadSettings,
  CallingConvention,
} from '../ffi.types.js'
import { structFactoryMap } from '../struct.factory.js'
import type { IKoffiLib, KoffiFunction, LibFuncs, RegisterFunctionOpts, StructFactory } from '../types.js'


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

const regCacheMap = new WeakMap<RegisterFunctionOpts['lib'], Map<string, KoffiFunction>>()


// #region bindMethodsFromFuncDefList

export interface BindOptions<T extends object> {
  lib: IKoffiLib
  inst: LibFuncs<T>
  config: LoadSettings
  funcDefList: FuncDefList<T>
}

export function bindMethodsFromFuncDefList(options: BindOptions<object>): void {
  const { lib, inst, config, funcDefList } = options

  for (const [name, params] of Object.entries(funcDefList)) {
    const func = registerFunction({
      lib,
      name,
      // @ts-expect-error ignore unknown
      params,
      convention: config.convention ?? CallingConvention.Cdecl,
    })

    bindMethods(inst, name, func)
  }
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


// #region gen_api_opts

/**
 * Generate function definitions via converting macro windows data type (like PVOID) to the expected value.
 * Skip assignment if property undefined
 */
export function gen_api_opts<T = DllFuncsType>(
  dllFuncs: FuncDefList<T>,
  fns?: FnDefName[],
): FuncDefList<T> {

  const ret = {} as FuncDefList<T>

  if (fns && Array.isArray(fns) && fns.length) {
    for (const fn of fns) {
      if (! Object.hasOwn(dllFuncs, fn)) {
        continue
      }
      // @ts-ignore
      const ps = dllFuncs[fn] as FnDefParams | undefined
      assert(ps, `dellFuncs has no property method name "${fn}"`)

      Object.defineProperty(ret, fn, {
        value: ps,
        writable: false,
        enumerable: true,
        configurable: false,
      })
    }
  }
  else {
    for (const fn of Object.keys(dllFuncs)) {
      // @ts-ignore
      const ps = dllFuncs[fn] as FnDefParams | undefined
      assert(ps, `dellFuncs has no property method name "${fn}"`)

      Object.defineProperty(ret, fn, {
        value: ps,
        writable: false,
        enumerable: true,
        configurable: false,
      })
    }
  }

  return ret
}


export function parse_settings(settings?: LoadSettings): LoadSettings {
  const st: LoadSettings = { ...settingsDefault }
  if (typeof settings !== 'undefined' && Object.keys(settings).length) {
    Object.assign(st, settings)
  }
  return st
}

// #region createStructFromFuncDefList

export function createStructFromFuncDefList(input: FuncDefList): void {
  const structFactories = prepareStructFromFuncDefList(input)
  structFactories.forEach((factory) => {
    factory()
    void 0
  })
}

function prepareStructFromFuncDefList(input: FuncDefList): Set<StructFactory> {
  const fns = new Set<StructFactory>()
  for (const [name, params] of Object.entries(input)) {
    try {
      const structSet = retrieveStructFactoryFromParams(params[1] as string[])
      if (structSet.size) {
        structSet.forEach((fn) => {
          fns.add(fn)
        })
      }
    }
    catch (ex) {
      const msg = `Failed to create struct for function: ${name}, you may need to create it manually.`
      throw new Error(msg, { cause: ex })
    }
  }
  return fns
}

function retrieveStructFactoryFromParams(params: string[]): Set<StructFactory> {
  const fns = new Set<StructFactory>()

  const structNames = retrieveStructTypeStringFromParams(params)
  if (! structNames.length) {
    return fns
  }

  const failed: string[] = []

  structNames.forEach((key) => {
    const factoryName = `${key}_Factory`
    const fn = structFactoryMap.get(factoryName)
    if (fn) {
      fns.add(fn)
    }
    else {
      failed.push(key)
    }
  })

  if (failed.length) {
    throw new Error(`Failed to find struct factory for: ${failed.join(', ')}`)
  }

  return fns
}

function retrieveStructTypeStringFromParams(params: string[]): string[] {
  const ret: string[] = []
  // '_Inout_ POINT*' or 'POINT *' or 'POINT*'
  const regex = /\b(\w+)\s?\*$/u
  params.map((val) => {
    const match = val.match(regex)
    if (match?.[1]) {
      ret.push(match[1].trim())
    }
  })

  return ret
}


// #region registerFunction

/**
 * @note do not call it directly, use `load()` instead!
 *  Case of making sure the library is loaded only once
 */
function registerFunction(options: RegisterFunctionOpts): KoffiFunction {
  const { lib, name, params, convention = CallingConvention.Stdcall } = options
  const cache = getRegisterFunctionFromCache(options)
  if (cache) {
    return cache
  }

  const { [0]: retType, [1]: args } = params
  let func: KoffiFunction
  // const func = user32.func('GetCursorPos', 'int', [`_Out_ ${comb.pointer}`])
  if (convention === CallingConvention.Cdecl) {
    func = lib.func(name, retType, args)
  }
  else {
    func = lib.func(convention, name, retType, args)
  }
  // console.log(func.info)
  setRegisterFunctionToCache(options, func)
  return func
}

function getRegisterFunctionFromCache(options: RegisterFunctionOpts): KoffiFunction | undefined {
  const { lib, name } = options
  const cache = regCacheMap.get(lib)
  return cache?.get(name)
}

function setRegisterFunctionToCache(options: RegisterFunctionOpts, func: KoffiFunction): void {
  const { lib, name } = options
  let cache = regCacheMap.get(lib)
  if (! cache) {
    cache = new Map<string, KoffiFunction>()
    regCacheMap.set(lib, cache)
  }
  cache.set(name, func)
}


/*
export function prepareDllFile(file: string): string {

  if (file.startsWith('file://')) {
    return file
  }
  else if (file.startsWith('http://') || file.startsWith('https://')) {
    return file
  }
  else if (file.startsWith('/')) {
    return file
  }
  try {
    const stat = statSync(file)
    if (stat.isFile()) {
      return file
    }
  }
  catch {
    // void
  }

  const { HOME, WINDIR } = process.env
  assert(HOME, 'HOME is not defined')
  assert(WINDIR, 'WINDIR is not defined')

  const sys32dir = `${WINDIR}/system32`
  const path = `${sys32dir}/${file}`
  const target = `${HOME}/${file}.dll`

  const stat = statSync(path)
  if (! stat.isFile()) {
    throw new Error(`${file} is not found in path: "${path}"`)
  }

  try {
    const stat2 = statSync(target)
    if (stat2.isFile()) {
      return target
    }
    copyFileSync(path, target)
  }
  catch {
    copyFileSync(path, target)
  }

  return target
} */

