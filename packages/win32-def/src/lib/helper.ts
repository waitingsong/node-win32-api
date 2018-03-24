import {
  settingsDefault,
  windefSet,
  windefSkipKeys,
  _UNICODE_HOLDER,
  _WIN64_HOLDER,
} from './config'
import * as WM from './model'


// convert macro variable of windef
export function parse_windef(windefObj: WM.Windef, settings?: WM.LoadSettings): WM.WinData {
  const ww = clone_filter_windef(windefObj) // output without macroMap
  const macroMap = <WM.MacroMap> windefObj.macroMap
  const macroSrc = prepare_macro(macroMap, settings)

  // append parsed marco to result
  for (const [k, v] of macroSrc.entries()) {
    if (typeof ww[k] !== 'undefined' && v) {
      ww[k] = v
    }
  }
  return prepare_windef_ref(ww)
}


/**
 * convert typeof array of param to string
 * such like ['_WIN64_HOLDER_', 'int64', 'int32'], no changed returning when string
 */
function parse_param_placeholder(param: WM.FFIParam | WM.MacroDef, settings?: WM.LoadSettings): WM.FFIParam {
  if (typeof param === 'string') {
    return param
  }
  else if (!param) {
    throw new Error('parse_param_placeholder(ps, settings) value of ps invalid')
  }
  else if (!Array.isArray(param) || param.length !== 3) {
    throw new Error('parse_param_placeholder(ps, settings) value of ps must Array and has THREE elements')
  }

  const st = parse_settings(settings)
  let p: WM.FFIParam = ''

  switch (param[0]) {
    case _WIN64_HOLDER:
      p = parse_placeholder_arch(param, <boolean> st._WIN64)
      break
    case _UNICODE_HOLDER:
      p = parse_placeholder_unicode(param, <boolean> st._UNICODE)
      break
    default:
      throw new Error('the value of param placeholder invlaid:' + param[0])
  }

  return p
}


// convert param like ['_WIN64_HOLDER_', 'int64', 'int32] to 'int64' or 'int32'
function parse_placeholder_arch(param: WM.FFIParam | WM.MacroDef, _WIN64: boolean): WM.FFIParam {
  if (typeof param === 'string') {
    return param
  }
  else if (!param || param.length !== 3) {
    throw new Error('_WIN64 macro should be Array and has 3 items')
  }

  return _WIN64 ? param[1] : param[2]
}

// convert param like ['_UNICODE_HOLDER_', 'uint16*', 'uint8*'] to 'uint16*' or 'uint8*'
export function parse_placeholder_unicode(param: WM.FFIParam | WM.MacroDef, _UNICODE: boolean): WM.FFIParam {
  if (typeof param === 'string') {
    return param
  }
  else if (!param || param.length !== 3) {
    throw new Error('_UNICODE macro should be Array and has 3 items')
  }
  return _UNICODE ? param[1] : param[2]
}


/**
 * parse ['_WIN64_HOLDER', 'int64*', 'int32*'] to 'int64*' or 'int32'
 * or ['_UNICODE_HOLDER_', 'uint16*', 'uint8*'] to 'uint16*' or 'uint8*'
 */
function prepare_macro(macroMap: WM.MacroMap, settings?: WM.LoadSettings): Map<string, WM.FFIParam> {
  const ret = <Map<string, WM.FFIParam>> new Map()

  // v string|array
  for (const [k, v] of macroMap.entries()) {
    ret.set(k, parse_param_placeholder(v, settings))
  }
  return ret
}


// parse const HANDLE = 'PVOID' to the realy FFIParam (like 'uint32*')
function prepare_windef_ref(ww: WM.WinData): WM.WinData {
  const ret = <WM.WinData> {}

  for (const x of Object.keys(ww)) {
    // if (windefSkipKeys.has(x)) {   // skip ww.macroMap
    //   continue
    // }
    const v = ww[x]

    if (windefSet.has(v)) {
      ret[x] = v
    }
    else if (typeof ww[v] === 'string') {
      // not valid FFIParam like 'int'
      // HANDLE == 'PVOID' , PVOID already parsed
      ret[x] = ww[v]
    }
  }

  return ret
}

// filter windef by Conf.windefSkipKeys, output only need key/value
function clone_filter_windef(windef: WM.Windef): WM.WinData {
  const ret = <WM.WinData> {}

  for (const x of Object.keys(windef)) {
    if (windefSkipKeys.has(x)) {   // macroMap
      continue
    }
    Object.defineProperty(ret, <string> x, {
      value: <WM.FFIParam> windef[x],
      writable: true,
      enumerable: true,
      configurable: true,
    })
  }

  return ret
}

function parse_settings(settings?: WM.LoadSettings): WM.LoadSettings {
  const st: WM.LoadSettings = {...settingsDefault}

  if (typeof settings !== 'undefined' && settings && Object.keys(settings).length) {
    Object.assign(st, settings)
  }
  return st
}
