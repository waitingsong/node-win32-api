
import {
  settingsDefault,
  windefSet,
  _UNICODE_HOLDER,
  _WIN64_HOLDER,
} from './config'
import {
  DataTypes,
  FFIParam,
  LoadSettings,
  MacroDef,
  MacroMap,
} from './model'


// convert macro variable of windef
export function parse_windef(windefObj: DataTypes, macroMap: MacroMap, settings?: LoadSettings): DataTypes {
  const ww = clone_filter_windef(windefObj) // output without macroMap
  const macroSrc = prepare_macro(macroMap, settings)

  return prepare_windef_ref(ww, macroSrc)
}


/**
 * convert typeof array of param to string
 * such like ['_WIN64_HOLDER_', 'int64', 'int32'], no changed returning when string
 */
function parse_param_placeholder(param: FFIParam | MacroDef, settings?: LoadSettings): FFIParam {
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
  let p: FFIParam = ''

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
function parse_placeholder_arch(param: FFIParam | MacroDef, _WIN64: boolean): FFIParam {
  if (typeof param === 'string') {
    return param
  }
  else if (!param || param.length !== 3) {
    throw new Error('_WIN64 macro should be Array and has 3 items')
  }

  return _WIN64 ? param[1] : param[2]
}

// convert param like ['_UNICODE_HOLDER_', 'uint16*', 'uint8*'] to 'uint16*' or 'uint8*'
function parse_placeholder_unicode(param: FFIParam | MacroDef, _UNICODE: boolean): FFIParam {
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
function prepare_macro(macroMap: MacroMap, settings?: LoadSettings): Map<string, FFIParam> {
  const ret = <Map<string, FFIParam>> new Map()

  // v string|array
  for (const [k, v] of macroMap.entries()) {
    ret.set(k, parse_param_placeholder(v, settings))
  }
  return ret
}

// parse const HANDLE = 'PVOID' to the realy FFIParam (like 'uint32*')
function prepare_windef_ref(ww: DataTypes, macroSrc: Map<string, string>): DataTypes {
  const map = <Map<string, string>> new Map()

  // first loop paser keys which exists in macroSrc
  for (const x of Object.keys(ww)) {
    /* istanbul ignore next */
    if (map.has(x)) {
      continue
    }
    if (macroSrc.has(x)) {  // PVOID:_WIN64_HOLDER -> PVOID:'uint64*'
      const vv = macroSrc.get(x)

      if (vv) {
        validDataDef(vv, windefSet)
        map.set(x, vv)
      }
      else {
        throw new Error(`value of "${vv}" blank`)
      }
    }
    else {
      continue  // not throw error
    }
  }
  // 2nd loop paser key , maybe value ref other key
  for (const x of Object.keys(ww)) {
    /* istanbul ignore next */
    if (map.has(x)) {
      continue
    }
    const value = retrieve_ref_value(ww, x, map)

    value && windefSet.has(value) && map.set(x, value)
  }

  const ret = <DataTypes> {}

  map.forEach((v, k) => {
    ret[k] = v
  })
  return ret
}

function clone_filter_windef(windef: DataTypes): DataTypes {
  const ret = <DataTypes> {}

  for (const x of Object.keys(windef)) {
    if (typeof windef[x] === 'string') {
      Object.defineProperty(ret, <string> x, {
        value: <FFIParam> windef[x],
        writable: true,
        enumerable: true,
        configurable: true,
      })
    }
    else {
      throw new Error(`typeof value of ${x} NOT string`)
    }
  }

  return ret
}

function parse_settings(settings?: LoadSettings): LoadSettings {
  const st: LoadSettings = {...settingsDefault}

  if (typeof settings !== 'undefined' && settings && Object.keys(settings).length) {
    Object.assign(st, settings)
  }
  return st
}

function retrieve_ref_value(ww: DataTypes, key: string, srcMap: Map<string, string>): string {
  const mapValue = srcMap.get(key)

  if (mapValue) {
    return mapValue
  }

  if (typeof ww[key] === 'undefined') {
    return ''
  }
  const value = ww[key]

  /* istanbul ignore next */
  if (! value) {
    return ''
  }
  // check whether ww has element value as key
  const refValue = retrieve_ref_value(ww, value, srcMap)

  return refValue ? refValue : value
}

// valid parsed value exists in windefSet
export function validDataDef(str: string, srcSet: Set<string>): void {
  if (! str || typeof str !== 'string') {
    throw new Error(`value of param invalid: ${str}`)
  }
  if (! srcSet.has(str)) {
    throw new Error(`conifig.windefSet not contains element of ${str}`)
  }
}
