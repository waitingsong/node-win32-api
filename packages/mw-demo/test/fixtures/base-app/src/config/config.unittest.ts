import { Config, MiddlewareConfig } from '~/index'


export const demoConfig: Config = {
  secret: '',
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

