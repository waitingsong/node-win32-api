
import {
  initialConfig,
  initialMiddlewareConfig,
  initMiddlewareOptions,
} from '##/lib/config.js'
import {
  Config,
  MiddlewareConfig,
} from '##/lib/types.js'


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

