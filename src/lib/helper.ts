import * as ffi from 'ffi'

import * as Conf from './conf'
import * as GT from './types'

const dllInst: Map<string, any> = new Map()    // for DLL.load() with settings.singleton === true

function get_inst_by_name<T>(dllName: string): T | void {
  return dllInst.get(dllName)
}

function set_inst_by_name<T>(dllName: string, inst: T): void {
  dllInst.set(dllName, inst)
}

function parse_settings(settings?: GT.LoadSettings): GT.LoadSettings {
  const st: GT.LoadSettings = { ...Conf.settingsDefault }

  if (typeof settings !== 'undefined' && settings && Object.keys(settings).length) {
    Object.assign(st, settings)
  }
  return st
}

export function load<T>(dllName: string, apiDef: GT.ApiDef, fns?: GT.FnName[], settings?: GT.LoadSettings): T {
  const st = parse_settings(settings)

  if (st && st.singleton) {
    let inst = get_inst_by_name<T>(dllName)

    if (!inst) {
      inst = <T> ffi.Library(dllName, gen_api_opts(apiDef, fns, st))
      set_inst_by_name(dllName, inst)
    }
    return inst
  }
  else {
    return ffi.Library(dllName, gen_api_opts(apiDef, fns, st))
  }
}

// generate function definitions via converting macro windows data type (like PVOID) to the expected value
export function gen_api_opts(apiDef: GT.ApiDef, fns?: GT.FnName[], settings?: GT.LoadSettings): GT.ApiDef {
  const opts = <GT.ApiDef> {}

  if (fns && Array.isArray(fns) && fns.length) {
    for (const fn of fns) {
      const ps: GT.FnParams = apiDef[fn]

      if (ps) {
        Object.defineProperty(opts, <string> fn, {
          value: <GT.FnParams> parse_placeholder(ps, settings),
          writable: false,
          enumerable: true,
          configurable: false,
        })
      }
    }
  }
  else {
    for (const fn of Object.keys(apiDef)) {
      const ps = <any> apiDef[fn]

      Object.defineProperty(opts, <string> fn, {
        value: <GT.FnParams> parse_placeholder(ps, settings),
        writable: false,
        enumerable: true,
        configurable: false,
      })
    }
  }

  return opts
}

export function parse_placeholder(ps: GT.FnParams, settings?: GT.LoadSettings): GT.FnParams {
  if (! ps || ! Array.isArray(ps) || ps.length !== 2) {
    throw new Error('parse_placeholder(ps, settings?) value of ps invalid!!')
  }
  const returnParam: GT.FnRetType = ps[0]
  const callParams: GT.FnCallParams = ps[1]
  const res = <GT.FnParams> new Array(2)


  // return param
  res[0] = parse_param_placeholder(returnParam, settings)

  // callling params
  // [ [placeholder, string, string],  [placeholder, string, string], string]
  const targetParams = <GT.FnCallParams> new Array()

  for (let i = 0, len = callParams.length; i < len; i++) {
    targetParams[i] = parse_param_placeholder(callParams[i], settings)
  }
  res[1] = targetParams

  return res
}


// convert typeof array of param to string
// such like ['_WIN64_HOLDER_', 'int64', 'int32'], no changed returning when string
export function parse_param_placeholder(param: GT.FFIParam | GT.MacroDef, settings?: GT.LoadSettings): GT.FFIParam {
  const st = parse_settings(settings)

  if (typeof param === 'string') {
    return param
  }
  else if (! param || ! Array.isArray(param) || param.length !== 3) {
    throw new Error('parse_param_placeholder(ps, settings) value of ps invalid')
  }

  let p: GT.FFIParam = ''

  switch (param[0]) {
    case Conf._WIN64_HOLDER:
      p = parse_placeholder_arch(param, <boolean> st._WIN64)
      break
    case Conf._UNICODE_HOLDER:
      p = parse_placeholder_unicode(param, <boolean> st._UNICODE)
      break
    default:
      throw new Error('the value of param placeholder invlaid:' + param[0])
  }

  return p
}


// convert param like ['_WIN64_HOLDER_', 'int64', 'int32] to 'int64' or 'int32'
export function parse_placeholder_arch(param: GT.FFIParam | GT.MacroDef, _WIN64: boolean): GT.FFIParam {
  if (typeof param === 'string') {
    return param
  }
  else if (! param || param.length !== 3) {
    throw new Error('_WIN64 macro should be Array and has 3 items')
  }

  return _WIN64 ? param[1] : param[2]
}

// convert param like ['_UNICODE_HOLDER_', 'uint16*', 'uint8*'] to 'uint16*' or 'uint8*'
export function parse_placeholder_unicode(param: GT.FFIParam | GT.MacroDef, _UNICODE: boolean): GT.FFIParam {
  if (typeof param === 'string') {
    return param
  }
  else if (! param || param.length !== 3) {
    throw new Error('_UNICODE macro should be Array and has 3 items')
  }
  return _UNICODE ? param[1] : param[2]
}

// convert macro variable of windef
export function parse_windef(W: GT.Windef, settings?: GT.LoadSettings): GT.WinData {
  const ww = clone_filter_windef(W)
  const macroMap = <GT.MacroMap> W.macroMap
  const windef = <{[prop: string]: string}> {}
  const macroSrc = prepare_macro(macroMap, settings)
  const ww2 = prepare_windef_ref(ww, macroSrc)

  for (const x of Object.keys(ww2)) {
    if (Conf.windefSkipKeys.has(x)) {   // skip windef.macroMap again
      continue
    }
    // @ts-ignore
    windef[x] = <GT.FFIParam> ww2[x]    // value processed by prepare_windef_ref() above
  }
  validateWinData(<GT.WinData> windef, Conf.windefSet)

  return <GT.WinData> windef
}


function prepare_macro(macroMap: Map<string, GT.MacroDef>, settings?: GT.LoadSettings): Map<string, GT.FFIParam> {
  const res = new Map()

  for (const [k, v] of macroMap.entries()) {
    res.set(k, parse_param_placeholder(v, settings))
  }

  return res
}


// parse const HANDLE = 'PVOID' to the realy FFIParam
// macroMap <['PVOID', 'uint32*'], ...>
function prepare_windef_ref(ww: GT.Windef, macroSrc: Map<string, string>): GT.WinData {
  const ret = <{[prop: string]: string}> {}

  for (const [k, v] of macroSrc.entries()) {
    if (typeof ww[<keyof GT.WinData> k] !== 'undefined' && v) {
      ww[k] = v // PVOID -> uint64*
    }
  }

  for (const [k, v] of Object.entries(ww)) {
    if (Conf.windefSkipKeys.has(k)) {   // skip ww.macroMap
      continue
    }

    if (typeof v === 'string') {
      if (Conf.windefSet.has(v)) {
        ret[k] = v
      }
      else {
        const value = lookupRef(v, ww, macroSrc)

        // tslint:disable-next-line
        if (typeof value === 'string' && value) {
          ret[k] = value
        }
        else {
          ret[k] = v  // maybe invalid for windefSet, will validateWinData() later
        }
      }
    }
    else {
      throw new Error(`prepare_windef_ref() missing entry for k/v: ${k}/${v}`)
    }
  }

  return <GT.WinData> ret
}

function lookupRef(key: string, ww: GT.Windef, macroSrc: Map<string, string>): string {
  let ret = _lookupRef(key, ww, macroSrc)

  if (! ret) {
    return ''
  }

  for (let i = 0, len = 3; i < len; i++) {
    const tmp = _lookupRef(ret, ww, macroSrc)

    if (tmp) {
      ret = tmp
    }
    else {
      break
    }
  }

  return ret
}
function _lookupRef(key: string, ww: GT.Windef, macroSrc: Map<string, string>): string {
  if (macroSrc.has(key)) {
    return <string> macroSrc.get(key)
  }
  let ret = ''

  // not valid FFIParam such 'int/uint...', like HMODULE: 'HANDLE'
  if (typeof ww[key] === 'string') {
    // parse HANDLE: 'PVOID' , PVOID already parsed
    ret = <string> ww[key]

    if (ret) {
      if (macroSrc.has(ret)) {  //  HANDLE:PVOID, macroSrc has PVOID
        return <string> macroSrc.get(ret)
      }
    }
    return ret
  }

  return ret
}

// filter windef by Conf.windefSkipKeys, output only need key/value
export function clone_filter_windef(windef: GT.Windef): GT.Windef {
  const ret = <GT.Windef> {}

  for (const x of Object.keys(windef)) {
    if (Conf.windefSkipKeys.has(x)) {   // macroMap
      continue
    }
    Object.defineProperty(ret, <string> x, {
      value: <GT.FFIParam> windef[x],
      writable: true,
      enumerable: true,
      configurable: true,
    })
  }

  return ret
}

export function validateWinData(windef: GT.WinData, windefSet: Set<string>): void {
  for (const [k, v] of Object.entries(windef)) {
    if (! k || ! v) {
      throw new Error(`validateWinData() k or v empty: "${k}"/"${v}"`)
    }
    if (typeof v !== 'string') {
      throw new Error(`validateWinData() v not typeof string: "${k}"/"${v}"`)
    }

    if (! windefSet.has(v)) {
      throw new Error(`validateWinData() value is invalid ffi param value: "${k}"/"${v}"`)
    }
  }
}
