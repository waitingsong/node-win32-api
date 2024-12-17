/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import assert from 'node:assert'

import type { FnDefArgs } from '##/lib/ffi.types.js'
import type { IKoffiLib, MultipleChoiceMapperList, MultipleChoiceMapperSet } from '##/lib/types.js'

import { LoaderCache } from './loader.cache.js'
import type { CreateKoffiFunctionOpts, CreateProxyMethodOptions, KoffiFunctionLike } from './loader.types.js'


export function createProxyMethod(options: CreateProxyMethodOptions): KoffiFunctionLike {
  const { name, fnDefRetType, fnDefCallParams, lib } = options

  const fnDefArgs = LoaderCache.getFnDefArgs(lib, name)
  assert(fnDefArgs.length > 0, 'fnDefArgs.length <= 0')

  const proxyFn = createKoffiFunctionLike({
    name,
    fnDefRetType,
    fnDefCallParams,
    funcSync: (...args: unknown[]) => createExecutionFn<unknown>({ lib, name, args, type: 'sync' }),
    funcAsync: (...args: unknown[]) => createExecutionFn<Promise<unknown>>({ lib, name, args, type: 'async' }),
  })

  return proxyFn
}

interface CreateFnOptions {
  type: 'sync' | 'async'
  lib: IKoffiLib
  name: string
  args: unknown[]
}

function createExecutionFn<R = unknown>(options: CreateFnOptions): R {
  const { lib, name, args, type } = options

  // args includes the last callback function for async call
  const pureArgs = type === 'async' ? args.slice(0, -1) : args

  const fnDefArgs = LoaderCache.getFnDefArgs(lib, name)
  assert(fnDefArgs.length > 0, 'fnDefArgs.length <= 0')

  const runtimeDefArgs = multipleChoiceMapperProcessor(lib, name, pureArgs)
  const func = LoaderCache.getFuncByDefArgs(lib, name, runtimeDefArgs)
  assert(typeof func === 'function', `Function ${name} not found in cache, For:
  args: ${JSON.stringify(runtimeDefArgs)},
  fnDefCallParamsExpanded: ${JSON.stringify(fnDefArgs)} `)
  if (type === 'async') {
    return func.async(...args) as R
  }
  else {
    return func(...args) as R
  }
}

function multipleChoiceMapperProcessor<T extends FnDefArgs[] = FnDefArgs[]>(
  lib: IKoffiLib,
  fnName: string,
  runtimeArgs: unknown[],
): T[number] {

  const fnDefCallParamsExpanded = LoaderCache.getFnDefArgs(lib, fnName)
  assert(fnDefCallParamsExpanded.length > 0, 'fnDefArgs.length <= 0')

  const mapperList = LoaderCache.getMultipleChoiceListMapperSet(lib, fnName)
  assert(mapperList && mapperList.size > 0, `multiple choice mapper not found for ${fnName}. It's may not be set.`)

  let matched: T[number] | undefined
  for (const mapper of mapperList) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const res = mapper(fnName, runtimeArgs, fnDefCallParamsExpanded)
    if (res) {
      assert(Array.isArray(res), `mapper must return an array`)
      assert(res.length > 0, `fnDefArgs not matched for ${fnName}.
  matchArgs: none,
  fnDefCallParamsExpanded: ${JSON.stringify(fnDefCallParamsExpanded)}`)

      matched = res
      break
    }
    // try next mapper if return undefined
  }

  assert(matched, `fnDefArgs not matched for ${fnName}.
  Check if missing function fnDefArgs, like
    EnumPrintersW: [D.BOOL,
    [
      D.DWORD,
      D.String,
      D.DWORD,
      [\`_Out_ \${S.PPRINTER_INFO_1}\`, \`_Out_ \${S.PPRINTER_INFO_4}\`], <== missing PPRINTER_INFO_5
      D.DWORD,
      D.LPDWORD,
      D.LPDWORD,
    ]],
  .
    `)
  return matched
}


function createKoffiFunctionLike(options: CreateKoffiFunctionOpts): KoffiFunctionLike {
  const { name, fnDefRetType, fnDefCallParams, funcSync, funcAsync } = options

  const info: KoffiFunctionLike['info'] = {
    name,
    fnDefRetType,
    fnDefCallParams,
  }
  Object.defineProperty(funcSync, 'info', {
    value: info,
  })
  Object.defineProperty(funcSync, 'async', {
    value: funcAsync,
  })

  return funcSync as KoffiFunctionLike
}

// #region updateMultipleChoiceMapperToCache

export interface UpdateMultipleChoiceMapperToCacheOptions {
  lib: IKoffiLib
  fnName?: string
  mapperSet?: MultipleChoiceMapperSet
  mapperList?: MultipleChoiceMapperList
}

export function updateMultipleChoiceMapperToCache(options: UpdateMultipleChoiceMapperToCacheOptions): void {
  const { lib, fnName, mapperSet, mapperList } = options
  if (mapperList?.size) {
    LoaderCache.updateMultipleChoiceListMapper(lib, mapperList)
  }

  if (fnName && mapperSet?.size) {
    const set = LoaderCache.getMultipleChoiceListMapperSet(lib, fnName)
    if (set) {
      for (const mapper of mapperSet) {
        set.add(mapper)
      }
    }
    else {
      LoaderCache.updateMultipleChoiceListMapper(lib, new Map([[fnName, mapperSet]]))
    }
  }
}
