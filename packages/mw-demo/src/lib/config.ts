import { Config } from './types'

import { MiddlewareConfig } from '~/interface'


export const enum ConfigKey {
  config = 'demoConfig',
  middlewareConfig = 'demoMiddlewareConfig',
  namespace = 'demo',
  componentName = 'demoComponent',
  middlewareName = 'demoMiddleware'
}

export const initialConfig: Readonly<Config> = {
  secret: '',
}
export const initialMiddlewareConfig: Readonly<MiddlewareConfig> = {
  enableMiddleware: true,
  ignore: [
    '/metrics',
    '/favicon.ico',
    '/favicon.png',
  ],
}

