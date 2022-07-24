import assert from 'node:assert'

import { FnName, LoadSettings, PromiseFnModel } from 'win32-def'

import {
  Spoolss,
  User32,
  Winspool,
} from '../index.promise.js'
import { DllNames } from '../lib/types.js'


const loaders = new Map<DllNames, Loader<unknown>>()
const mods = new Map<DllNames, PromiseFnModel<unknown>>()

loaders.set(DllNames.spoolss, Spoolss.load)
loaders.set(DllNames.user32, User32.load)
loaders.set(DllNames.winspool, Winspool.load)


export function getMod<T>(name: DllNames): PromiseFnModel<T> {
  assert(name)
  const cache = mods.get(name)

  if (cache) {
    return cache as PromiseFnModel<T>
  }

  const loader = loaders.get(name) as Loader<T> | undefined
  if (! loader) {
    throw new TypeError(`Loader of "${name}" not found`)
  }

  const mod = loader()
  assert(mod)
  mods.set(name, mod)

  return mod
}


type Loader<T> = (fns?: FnName[], settings?: LoadSettings) => PromiseFnModel<T>

