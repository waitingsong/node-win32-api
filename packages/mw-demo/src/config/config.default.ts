import type { RouterOption } from '@midwayjs/core'

import {
  initMiddlewareOptions,
  initialConfig,
  initialMiddlewareConfig,
} from '##/lib/config.js'
import type { Config, MiddlewareConfig } from '##/lib/types.js'


export const demoConfig: Readonly<Config> = {
  ...initialConfig,
}

export const demoMiddlewareConfig: Readonly<Omit<MiddlewareConfig, 'match'>> = {
  ...initialMiddlewareConfig,
  ignore: [
    '/',
    '/ping',
    '/favicon.ico',
    '/favicon.png',
  ],
  options: {
    ...initMiddlewareOptions,
  },
}

export const swagger = {
  routerFilter: (url: string, options: RouterOption) => {
    void options
    if (url.startsWith('/_')) {
      return true
    }
  },
}

