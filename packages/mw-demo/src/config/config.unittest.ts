import { initialConfig, initialMiddlewareConfig } from '~/lib/config'
import type { Config, MiddlewareConfig } from '~/lib/types'


export const keys = 123456
export const koa = {
  port: 7001,
}

export const demoConfig: Readonly<Config> = {
  ...initialConfig,
  enableDefaultRoute: true,
}

export const demoMiddlewareConfig: Readonly<Omit<MiddlewareConfig, 'match'>> = {
  ...initialMiddlewareConfig,
  enableMiddleware: true,
  ignore: [
    '/',
    '/ping',
    '/favicon.ico',
    '/favicon.png',
  ],
}

