import { Config, MiddlewareConfig } from '../lib/types'


export const keys = 123456
export const koa = {
  port: 7001,
}

export const demoConfig: Config = {
  enableDefaultRoute: true,
}

export const demoMiddlewareConfig: Readonly<Omit<MiddlewareConfig, 'match'>> = {
  enableMiddleware: true,
  ignore: [
    '/',
    '/ping',
    '/favicon.ico',
    '/favicon.png',
  ],
}

