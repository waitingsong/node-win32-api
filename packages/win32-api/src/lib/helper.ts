/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable import/no-extraneous-dependencies */
import assert from 'node:assert'
import { copyFileSync, statSync } from 'node:fs'

import koffi from 'koffi'
import ref from 'ref-napi'
import {
  AsyncSyncFuncModel,
  DllFuncs,
  DllFuncsModel,
  Def,
  ExpandFnModel,
  FnName,
  FnParams,
  LoadSettings,
  PromiseFnModel,
  settingsDefault,
  CallingConvention,
} from 'win32-def'

import { KoffiFunction, LoadOptions, RegisterFunctionOpts } from './types.js'


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

export function registerFunction(options: RegisterFunctionOpts): KoffiFunction {
  const { lib, name, params, convention = CallingConvention.Stdcall } = options
  const { [0]: retType, [1]: args } = params

  // const func = user32.func('GetCursorPos', 'int', [`_Out_ ${comb.pointer}`])
  if (convention === CallingConvention.Cdecl) {
    const func = lib.func(name, retType, args)
    return func
  }
  const func = lib.func(convention, name, retType, args)
  // console.log(func.info)
  return func
}

function prepareDllFile(file: string): string {

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
}

/**
 * Copy file from src to dest but change the file extension to ext
 */
// export async function copyFileWithDllExt(
//   src: string,
//   targetDir: string,
//   ext = 'dll',
// ): Promise<string> {

//   const [file] = basename(src).split('.')
//   assert(file)

//   const target = `${targetDir}/${file}.${ext}`
//   if (await isFileExists(target)) {
//     return target
//   }
//   await copyFile(src, target)
//   return target
// }


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

async function callFnAsync<T extends AsyncSyncFuncModel>(
  target: T,
  args: unknown[],
): Promise<unknown> {

  assert(target)
  assert(typeof target.async === 'function')

  return new Promise<unknown>((done, reject) => {
    const cb = (err: Error | void, result: unknown) => {
      if (err) {
        reject(err)
        return
      }
      done(result)
    }
    // @ts-ignore
    Reflect.apply(target.async, null, [...args, cb])
  })
}


/**
 * Generate function definitions via converting macro windows data type (like PVOID) to the expected value.
 * Skip assignment if property undefined
 */
export function gen_api_opts<T = DllFuncsModel>(
  dllFuncs: DllFuncs<T>,
  fns?: FnName[],
): DllFuncs<T> {

  const ret = {} as DllFuncs<T>

  if (fns && Array.isArray(fns) && fns.length) {
    for (const fn of fns) {
      if (! Object.hasOwn(dllFuncs, fn)) {
        continue
      }
      // @ts-ignore
      const ps = dllFuncs[fn] as FnParams | undefined
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
      const ps = dllFuncs[fn] as FnParams | undefined
      assert(ps, `dellFuncs has no property mehod name "${fn}"`)

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


function parse_settings(settings?: LoadSettings): LoadSettings {
  const st: LoadSettings = { ...settingsDefault }
  // const st: LoadSettings = {
  //   singleton: true,
  //   _WIN64: true,
  // }

  if (typeof settings !== 'undefined' && Object.keys(settings).length) {
    Object.assign(st, settings)
  }
  return st
}


export function ucsBufferFrom(str: string | undefined | null): Buffer {
  if (typeof str === 'string' && str.length) {
    return Buffer.from(str + '\0', 'ucs2')
  }
  return ref.NULL
}

export function ucsBufferToString(buffer: Buffer, charCount?: number | undefined): string {
  const str = typeof charCount === 'number'
    ? buffer.toString('ucs2', 0, charCount * 2)
    : buffer.toString('ucs2')
  return str.replace(/\0+$/u, '').replace(/^\0+/u, '')
}


/**
 * Split with null till next char (\0)
 */
export function ucsBufferSplit(buffer: Buffer, maxCount?: number): string[] {
  const ret: string[] = []
  const row: string[] = []
  const { byteLength } = buffer

  if (! byteLength) { return ret }
  const count = maxCount ? maxCount : byteLength

  for (let i = 0; i < byteLength;) {
    const t1 = ref.readCString(buffer, i)
    if (t1) {
      row.push(t1)
      i += t1.length * 2
      continue
    }
    else if (row.length > 0) {
      ret.push(row.join(''))
      row.length = 0
    }
    else {
      i += 2
    }

    if (ret.length >= count) {
      break
    }
  }

  row.length = 0
  return ret
}


