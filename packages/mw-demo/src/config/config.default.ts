import {
  initialConfig,
  initialMiddlewareConfig,
  initMiddlewareOptions,
} from '../lib/config'
import { Config, MiddlewareConfig } from '../lib/types'


export const demoConfig: Config = {
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

