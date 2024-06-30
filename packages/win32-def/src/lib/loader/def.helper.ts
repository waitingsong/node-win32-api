import assert from 'node:assert'

import type { MethodTypeUnknown } from '@waiting/shared-types'

import type {
  FnDefFullParams,
  FnDefName,
  FuncDefList,
  FuncDefListInner,
} from '##/lib/ffi.types.js'


// #region processDefList()

export function processDefList(
  dllFuncs: FuncDefList,
  fns: FnDefName[] | readonly FnDefName[] | undefined,
): FuncDefListInner {

  const map = genDefList(dllFuncs)
  const map2: FuncDefListInner = new Map()

  if (fns && Array.isArray(fns) && fns.length) {
    fns.forEach((fnName) => {
      if (fnName.endsWith('_Async')) {
        const syncFnName = fnName.replace(/_Async$/u, '')
        const data = map.get(syncFnName)
        if (data) {
          map2.set(syncFnName, data)
        }
      }
      else { // sync
        const data = map.get(fnName)
        if (data) {
          map2.set(fnName, data)
        }
      }
    })
    return map2
  }

  return map
}


// #region genDefList()

/**
 * Generate function definitions via converting macro windows data type (like PVOID) to the expected value.
 */
export function genDefList(dllFuncs: FuncDefList): FuncDefListInner {
  const ret = typeof dllFuncs === 'function'
    ? genListFromClass(dllFuncs) // class def
    : genListFromObject(dllFuncs) // const def
  return ret
}


function genListFromObject(input: object): FuncDefListInner {
  const ret: FuncDefListInner = new Map()
  for (const fnName of Object.keys(input)) {
    // @ts-ignore
    const ps = input[fnName] as unknown
    if (Array.isArray(ps) && ps.length === 2) {
      assert(ps[0] && ps[1], `dellFuncs has no property method name "${fnName}"`)
      assert(typeof ps[0] === 'string', `dellFuncs has no property method name "${fnName}"`)
      ret.set(fnName, ps as FnDefFullParams)
    }
  }
  return ret
}

function genListFromClass(input: MethodTypeUnknown): FuncDefListInner {
  assert(typeof input === 'function', 'input must be a class')

  const ret: FuncDefListInner = new Map()
  for (const key in input) {
    // @ts-ignore
    const ps = input[key] as unknown
    if (Array.isArray(ps) && ps.length === 2) {
      assert(ps[0] && ps[1], `dellFuncs has no property method name "${key}"`)
      assert(typeof ps[0] === 'string', `dellFuncs has no property method name "${key}"`)
      ret.set(key, ps as FnDefFullParams)
    }
  }
  return ret
}

