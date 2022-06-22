import { isPathMatchRules } from '@waiting/shared-core'

import {
  Config,
  ConfigKey,
  initialConfig,
  initialMiddlewareConfig,
  initMiddlewareOptions,
  MiddlewareConfig,
} from '../lib/index'

import { Application, Context } from '~/interface'


/**
 * Return true if rules of match and ignore empty
 */
export function matchFunc(ctx?: Context): boolean {
  if (! ctx) {
    return false
  }

  const mwConfig = getMiddlewareConfig(ctx.app)
  const { enableMiddleware, match, ignore } = mwConfig

  if (! enableMiddleware) {
    return false
  }

  if (Array.isArray(ignore) && ignore.length) {
    const matched = isPathMatchRules(ctx.path, ignore)
    return ! matched
  }
  else if (Array.isArray(match) && match.length) {
    const matched = isPathMatchRules(ctx.path, ignore)
    return matched
  }
  else {
    return true
  }
}


export function getComponentConfig<T extends Config = Config>(
  app: Application,
  key: ConfigKey = ConfigKey.config,
): T {

  const pConfig = getConfigFromApp<T>(app, key)
  const config = mergeConfig<T>(pConfig)
  return config
}

export function getMiddlewareConfig<T extends MiddlewareConfig = MiddlewareConfig>(
  app: Application,
  key: ConfigKey = ConfigKey.middlewareConfig,
): T {

  const pConfig = getConfigFromApp<T>(app, key)
  const config = mergeMiddlewareConfig<T>(pConfig)
  return config
}

function getConfigFromApp<T>(app: Application, key: ConfigKey): T {
  const config = app.getConfig(key) as T
  return config
}


export function mergeConfig<T extends Config = Config>(input?: Partial<Config>): T {
  const ret: T = {
    ...initialConfig,
    ...input,
  } as T
  return ret
}

export function mergeMiddlewareConfig<T extends MiddlewareConfig = MiddlewareConfig>(input?: T): T {
  const ret = {
    ...initialMiddlewareConfig,
    options: {
      ...initMiddlewareOptions,
    },
  } as T

  if (! input) {
    return ret
  }

  if (typeof input.enableMiddleware === 'boolean') {
    ret.enableMiddleware = input.enableMiddleware
  }

  const { match, ignore } = input
  if (Array.isArray(match) && match.length) {
    ret.match = match
  }
  else if (Array.isArray(ignore) && ignore.length) {
    ret.ignore = ignore
  }

  const { options } = input
  if (typeof options !== 'undefined') {
    const opts = {
      ...initMiddlewareOptions,
      ...options,
    }
    ret.options = opts
  }

  return ret
}

