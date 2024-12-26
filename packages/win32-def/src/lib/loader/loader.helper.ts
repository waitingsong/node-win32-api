import assert from 'node:assert'

import koffi from 'koffi'

import { loadOptionsDefault } from '##/lib/config.js'
import { Def } from '##/lib/def.enum.js'
import { CallingConvention } from '##/lib/ffi.types.js'
import type { FnDefArgs, FnDefFullParams, FuncDefListInner } from '##/lib/ffi.types.js'
import { structFactoryMap } from '##/lib/struct/struct.factory-map.js'
import type {
  FLib,
  IKoffiLib,
  KoffiFunction,
  LoadOptions,
  MultipleChoiceMapperList,
  StructFactory,
  UpdateMultipleChoiceMapperOptions,
} from '##/lib/types.js'

import { expandFFIParamArray } from '../ffi.js'

import { LoaderCache } from './loader.cache.js'
import type {
  BindOptions,
  KoffiFunctionLike,
  RegisterFunctionOpts,
  RegisterFunctionOptsInner,
} from './loader.types.js'
import { createProxyMethod, updateMultipleChoiceMapperToCache } from './multiple-choice-param.helper.js'


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


// #region loadIKoffiLibAndBindProperties

export function loadIKoffiLib(libName: string): IKoffiLib {
  const lib = koffi.load(libName)
  assert(lib, `load library ${libName} failed`)
  LoaderCache.setLibByName(libName, lib)
  return lib
}

export function bindFLibExtMethods(libName: string, lib: IKoffiLib, inst: FLib) {
  assert(lib, `load library undefined`)

  if (typeof inst.unload === 'undefined') {
    Object.defineProperty(inst, 'unload', {
      enumerable: false,
      value: () => {
        LoaderCache.removeLibByName(libName)
        lib.unload()
      },
    })
  }

  if (typeof inst.updateMultipleChoiceMapper === 'undefined') {
    Object.defineProperty(inst, 'updateMultipleChoiceMapper', {
      enumerable: false,
      value: function (this: IKoffiLib, opts2: UpdateMultipleChoiceMapperOptions) {
        updateMultipleChoiceMapperToCache({
          ...opts2,
          lib: this,
        })
      }.bind(lib),
    })
  }
}

// #region bindMethodsFromFuncDefList


export function bindMethodsFromFuncDefList(options: BindOptions): void {
  const { lib, inst, loadOptions, funcDefList, multipleChoiceMapperList: multipleChoiceMapper } = options

  for (const [name, params] of funcDefList) {
    const funcs = registerFunction({
      lib,
      fnName: name,
      fnFullParams: params,
      /* c8 ignore next */
      convention: loadOptions.convention ?? CallingConvention.Cdecl,
      forceRegister: !! loadOptions.forceRegister,
    })

    const { size } = funcs
    if (size === 1) {
      for (const [, fn] of funcs.entries()) {
        bindMethod(inst, name, fn)
      }
    }
    else if (size > 1) {
      if (! multipleChoiceMapper) {
        console.info(`multipleChoiceMapper should be set and be a function when multiple choice used.
      Syntax: (fnName: string, params: string[]) => string[]
      const user32 = load({
        dll: 'user32.dll',
        dllFuncs: defWin32,
        multipleChoiceMapperList: multipleChoiceMapperList
      })
      // OR
      const user32 = load({
        dll: 'user32.dll',
        dllFuncs: defWin32,
      })
      user32.updateMultipleChoiceMapper({ mapperList: mapperList })
        `)
      }

      const fn = createProxyMethod({
        lib,
        name,
        fnDefRetType: params[0],
        fnDefCallParams: params[1],
      })
      bindMethod(inst, name, fn)
    }
  }
}


function bindMethod(inst: FLib, name: string, fn: KoffiFunction | KoffiFunctionLike): void {
  const nameSync = name
  if (typeof inst[nameSync] === 'undefined') {
    Object.defineProperty(inst, nameSync, {
      enumerable: true,
      value: fn,
    })
  }

  const nameAsync = `${name}_Async`
  if (typeof inst[nameAsync] === 'undefined') {
    Object.defineProperty(inst, nameAsync, {
      enumerable: true,
      value: (...args: unknown[]) => callFnAsync(fn, args),
    })
  }
}

function callFnAsync(fn: KoffiFunction | KoffiFunctionLike, args: unknown[]) {
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



export function parse_settings(options: LoadOptions): LoadOptions {
  const opts: LoadOptions = {
    ...loadOptionsDefault,
    ...options,
  }
  return opts
}

// #region createStructFromFuncDefList

export function createStructFromFuncDefList(input: FuncDefListInner): void {
  const structFactories = prepareStructFromFuncDefList(input)
  structFactories.forEach((factory) => {
    factory()
  })
}

function prepareStructFromFuncDefList(input: FuncDefListInner): Set<StructFactory> {
  const fns = new Set<StructFactory>()
  for (const [name, params] of input) {
    try {
      const p2 = expandFFIParamArray(params[1])
      p2.forEach((args: string[]) => {
        const structSet = retrieveStructFactoryFromParams(args)
        if (structSet.size) {
          structSet.forEach((fn) => {
            fns.add(fn)
          })
        }
      })
    }
    catch (ex) {
      assert(ex instanceof Error)
      const msg = `Failed to create struct for function: ${name}, you may need to create it manually.
      Error: ${ex.message}`
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

const DefValuesSet = new Set(Object.values(Def))
// @ts-expect-error
DefValuesSet.add('char')

function retrieveStructTypeStringFromParams(params: string[]): string[] {
  const ret: string[] = []
  // '_Inout_ POINT*' or 'POINT *' or 'POINT*'
  const regex = /\b(\w+)\s?\*$/u
  params.map((val) => {
    const match = regex.exec(val)
    const key = match?.[1]?.trim()
    if (key) {
      // if Def contains key, then skip
      // @ts-expect-error
      if (DefValuesSet.has(key)) {
        return
      }
      ret.push(key)
    }
  })

  return ret
}


// #region registerFunction

/**
 * @note do not call it directly, use `load()` instead!
 *  Case of making sure the library is loaded only once
 */
function registerFunction(options: RegisterFunctionOpts): Map<FnDefArgs, KoffiFunction> {
  const { lib, fnName, fnFullParams: params, convention = CallingConvention.Stdcall } = options
  const cache = options.forceRegister ? null : LoaderCache.getRegisteredFuncMap(lib, fnName)
  if (cache?.size) {
    return cache
  }

  const map = new Map<FnDefArgs, KoffiFunction>()
  const { [0]: retType, [1]: args } = params
  if (args.length === 0) {
    const params2 = [retType, []] as FnDefFullParams
    // @ts-expect-error params2 is FnDefParams
    const func = _registerFunction({ lib, fnName: fnName, fnFullParams: params2, convention })
    map.set([], func)
    return map
  }

  // 对于 args 每个成员检查是否为数组，是则迭代处理每个组合进行多次绑定方法
  const ps = expandFFIParamArray(args)

  ps.forEach((args2) => {
    const params2 = [retType, args2] as FnDefFullParams
    // @ts-expect-error params2 is FnDefParams
    const func = _registerFunction({ lib, fnName: fnName, fnFullParams: params2, convention })
    map.set(args2, func)
  })

  return map
}

function _registerFunction(options: RegisterFunctionOptsInner): KoffiFunction {
  const { lib, fnName, fnFullParams, convention = CallingConvention.Stdcall } = options
  const { [0]: retType, [1]: args } = fnFullParams
  assert(retType, 'retType is empty')
  assert(args, 'args is empty')

  // let func: KoffiFunction
  // const func = user32.func('GetCursorPos', 'int', [`_Out_ ${comb.pointer}`])
  // switch (convention) {
  //   case CallingConvention.Cdecl:
  //     func = lib.func(fnName, retType, args)
  //     break

  //   default:
  //     func = lib.func(convention, fnName, retType, args)
  // }
  const func = convention ? lib.func(convention, fnName, retType, args) : lib.func(fnName, retType, args)
  // console.log(func.info)
  LoaderCache.setRegisteredFuncToCache(lib, fnName, func, args)
  return func
}

// #region SaveFnMultipleChoiceMapper

export function saveFnMultipleChoiceMapperList(lib: IKoffiLib, fnMultipleChoiceMapperList: MultipleChoiceMapperList): void {
  assert(fnMultipleChoiceMapperList.size > 0, 'options.fnMultipleChoiceMapperList contains no item')
  LoaderCache.updateMultipleChoiceListMapper(lib, fnMultipleChoiceMapperList)
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

