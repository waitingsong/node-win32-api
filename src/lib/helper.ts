import * as ffi from 'ffi'
import { Config, FModel } from 'win32-def'


const dllInst: Map<string, any> = new Map()    // for DLL.load() with settings.singleton === true

export function load<T>(
  dllName: string,
  dllFuncs: FModel.DllFuncs,
  fns?: FModel.FnName[],
  settings?: FModel.LoadSettings,
): T {

  const st = parse_settings(settings)

  if (st && st.singleton) {
    let inst = get_inst_by_name<T>(dllName)

    if (!inst) {
      inst = <T> ffi.Library(dllName, gen_api_opts(dllFuncs, fns))
      set_inst_by_name(dllName, inst)
    }
    return inst
  }
  else {
    return ffi.Library(dllName, gen_api_opts(dllFuncs, fns))
  }
}


// generate function definitions via converting macro windows data type (like PVOID) to the expected value
export function gen_api_opts(dllFuncs: FModel.DllFuncs, fns?: FModel.FnName[]): FModel.DllFuncs {
  const ret = <FModel.DllFuncs> {}

  if (fns && Array.isArray(fns) && fns.length) {
    for (const fn of fns) {
      const ps: FModel.FnParams = dllFuncs[fn]

      if (ps) {
        Object.defineProperty(ret, <string> fn, {
          value: <FModel.FnParams> ps,
          writable: false,
          enumerable: true,
          configurable: false,
        })
      }
    }
  }
  else {
    for (const fn of Object.keys(dllFuncs)) {
      const ps = <any> dllFuncs[fn]

      Object.defineProperty(ret, <string> fn, {
        value: <FModel.FnParams> ps,
        writable: false,
        enumerable: true,
        configurable: false,
      })
    }
  }

  return ret
}

function get_inst_by_name<T>(dllName: string): T | void {
  return dllInst.get(dllName)
}

function set_inst_by_name<T>(dllName: string, inst: T): void {
  dllInst.set(dllName, inst)
}

function parse_settings(settings?: FModel.LoadSettings): FModel.LoadSettings {
  const st: FModel.LoadSettings = { ...Config.settingsDefault }

  if (typeof settings !== 'undefined' && settings && Object.keys(settings).length) {
    Object.assign(st, settings)
  }
  return st
}
