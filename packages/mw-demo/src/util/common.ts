import { isPathMatchRules } from '@waiting/shared-core'

import {
  ConfigKey,
  initialMiddlewareConfig,
  initialConfig,
} from '../lib/config'
import { Config } from '../lib/types'

import { Application, Context, MiddlewareConfig } from '~/interface'


/**
 * Return true if rules of match and ignore empty
 */
export function matchFunc(ctx?: Context): boolean {
  if (! ctx) {
    return false
  }

  const mwConfig = getMiddlewareConfigFromApp(ctx.app)
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


export function getConfigFromApp(
  app: Application,
  key: ConfigKey = ConfigKey.config,
): Config {

  const pConfig = getConfig<Partial<Config>>(app, key)
  const config = mergeConfig(pConfig)
  return config
}

export function getMiddlewareConfigFromApp(
  app: Application,
  key: ConfigKey = ConfigKey.middlewareConfig,
): MiddlewareConfig {

  const pConfig = getConfig<Partial<MiddlewareConfig>>(app, key)
  const config = mergeMiddlewareConfig(pConfig)
  return config
}

export function getConfig<T>(app: Application, key: ConfigKey): T {
  const config = app.getConfig(key) as T
  return config
}


export function mergeConfig(input?: Partial<Config>): Config {
  const ret: Config = {
    ...initialConfig,
    ...input,
  }
  return ret
}

export function mergeMiddlewareConfig(input?: Partial<MiddlewareConfig>): MiddlewareConfig {
  if (! input) {
    return { ...initialMiddlewareConfig }
  }

  const enableMiddleware = typeof input.enableMiddleware === 'boolean'
    ? input.enableMiddleware
    : initialMiddlewareConfig.enableMiddleware

  const { match, ignore } = input
  if (Array.isArray(match) && match.length) {
    const ret = {
      enableMiddleware,
      match,
    }
    return ret
  }
  else if (Array.isArray(ignore) && ignore.length) {
    const ret = {
      enableMiddleware,
      ignore,
    }
    return ret
  }
  else {
    const ret = {
      enableMiddleware,
      ignore: initialMiddlewareConfig.ignore,
    }
    return ret
  }
}

