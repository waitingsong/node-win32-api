/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable import/no-extraneous-dependencies */
import assert from 'node:assert'
import { copyFileSync, statSync } from 'node:fs'

import ffi from 'ffi-napi'
import ref from 'ref-napi'
import StructDi from 'ref-struct-di'
import {
  AsyncSyncFuncModel,
  DllFuncs,
  DllFuncsModel,
  ExpandFnModel,
  FnName,
  FnParams,
  LoadSettings,
  PromiseFnModel,
  StructDefType,
  StructInstanceBase,
  settingsDefault,
} from 'win32-def'


const dllInstMap = new Map<string, unknown>() // for DLL.load() with settings.singleton === true
// const hasAsyncProxy = '__hasAsyncProxy__'

export function load<T>(
  dllName: string,
  dllFuncs: DllFuncs<T>,
  fns?: FnName[],
  settings?: LoadSettings,
): T {

  const st = parse_settings(settings)

  const name = dllName.endsWith('.drv')
    ? preprareDllFile(dllName)
    : dllName

  if (st.singleton) {
    let inst = get_inst_by_name<T>(name)

    if (! inst) {
      const ps = gen_api_opts<T>(dllFuncs, fns)
      // ffi.Library.EXT = ext
      inst = ffi.Library(name, ps) as unknown as T
      set_inst_by_name(name, inst)
    }
    return inst
  }
  else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return ffi.Library(name, gen_api_opts<T>(dllFuncs, fns)) as unknown as T
  }
}

function preprareDllFile(file: string): string {

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


export function loadAsync<T>(
  dllName: string,
  dllFuncs: DllFuncs<T>,
  fns?: FnName[],
  settings?: LoadSettings,
): PromiseFnModel<T> {

  const inst = load<ExpandFnModel<DllFuncsModel>>(dllName, dllFuncs, fns, settings)
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
      assert(ps, `dellFuncs has no property mehod name "${fn}"`)

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
        value: ps as FnParams,
        writable: false,
        enumerable: true,
        configurable: false,
      })
    }
  }

  return ret
}

function get_inst_by_name<T>(dllName: string): T | undefined {
  return dllInstMap.get(dllName) as T | undefined
}

function set_inst_by_name<T>(dllName: string, inst: T): void {
  dllInstMap.set(dllName, inst)
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


/**
 * @example ```ts
 * const point = new Struct(DS.POINT)() as M.POINT_Struct
 * point.x = 123
 * const lParam = point.ref().address()
 * const obj = retrieveStructFromPtrAddress<M.POINT_Struct>(lParam, DS.POINT)
 * obj && console.log({ objx: obj.x, objy: obj.y })
 * ```
 */
export function retrieveStructFromPtrAddress<R extends StructInstanceBase>(
  address: number,
  dataStructConst: StructDefType,
): R | undefined {

  assert(dataStructConst, 'dataStructConst is required')

  const StructClass = StructDi(ref)
  assert(StructClass, 'Struct is required')
  // @ts-ignore
  const object = new StructClass(dataStructConst)() as R
  assert(object, 'StructClass instance is undefined')

  const refType = object.ref().ref().type
  const buf = Buffer.alloc(8)
  buf.writeInt64LE(address, 0)
  buf.type = refType

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const ret = buf.deref().deref() as R
    return ret
  }
  catch (ex) {
    console.warn(ex)
  }
}


