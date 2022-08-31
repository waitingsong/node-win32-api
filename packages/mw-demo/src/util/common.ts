import { isPathMatchRules } from '@waiting/shared-core'

import {
  Config,
  ConfigKey,
  MiddlewareConfig,
} from '../lib/types'

import type { Application, Context } from '~/interface'


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

  const config = getConfigFromApp<T>(app, key)
  return config
}

export function getMiddlewareConfig<T extends MiddlewareConfig = MiddlewareConfig>(
  app: Application,
  key: ConfigKey = ConfigKey.middlewareConfig,
): T {

  const config = getConfigFromApp<T>(app, key)
  return config
}

function getConfigFromApp<T>(app: Application, key: ConfigKey): T {
  const config = app.getConfig(key) as T
  return config
}

