import { Config, MiddlewareConfig } from '~/lib/types'


export const demoConfig: Config = {
  enableHelloRoute: true,
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

