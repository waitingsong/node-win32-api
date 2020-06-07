/* eslint-disable @typescript-eslint/no-explicit-any */
import * as ffi from 'ffi-napi'
import { Config, FModel } from 'win32-def'


const dllInst = new Map<string, any>() // for DLL.load() with settings.singleton === true

export function load<T>(
  dllName: string,
  dllFuncs: FModel.DllFuncs,
  fns?: FModel.FnName[],
  settings?: FModel.LoadSettings,
): T {

  const st = parse_settings(settings)

  if (st.singleton) {
    let inst = get_inst_by_name<T>(dllName)

    if (! inst) {
      inst = ffi.Library(dllName, gen_api_opts(dllFuncs, fns)) as T
      set_inst_by_name(dllName, inst)
    }
    return inst
  }
  else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return ffi.Library(dllName, gen_api_opts(dllFuncs, fns))
  }
}


/**
 * Generate function definitions via converting macro windows data type (like PVOID) to the expected value.
 * Skip assignment if property undefined
 */
export function gen_api_opts(dllFuncs: FModel.DllFuncs, fns?: FModel.FnName[]): FModel.DllFuncs {
  const ret: FModel.DllFuncs = {}

  if (fns && Array.isArray(fns) && fns.length) {
    for (const fn of fns) {
      const ps: FModel.FnParams = dllFuncs[fn]

      if (typeof ps !== 'undefined') {
        Object.defineProperty(ret, fn, {
          value: ps,
          writable: false,
          enumerable: true,
          configurable: false,
        })
      }
    }
  }
  else {
    for (const fn of Object.keys(dllFuncs)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const ps = dllFuncs[fn] as any

      if (typeof ps !== 'undefined') {
        Object.defineProperty(ret, fn, {
          value: ps as FModel.FnParams,
          writable: false,
          enumerable: true,
          configurable: false,
        })
      }
    }
  }

  return ret
}

function get_inst_by_name<T>(dllName: string): T | undefined {
  return dllInst.get(dllName) as T | undefined
}

function set_inst_by_name<T>(dllName: string, inst: T): void {
  dllInst.set(dllName, inst)
}

function parse_settings(settings?: FModel.LoadSettings): FModel.LoadSettings {
  const st: FModel.LoadSettings = { ...Config.settingsDefault }

  if (typeof settings !== 'undefined' && Object.keys(settings).length) {
    Object.assign(st, settings)
  }
  return st
}

