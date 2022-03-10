import {
  Config,
  MiddlewareConfig,
  MiddlewareOptions,
} from './types'


export const initialConfig: Readonly<Config> = {
  secret: '',
}
export const initMiddlewareOptions: MiddlewareOptions = {
  debug: false,
}
export const initialMiddlewareConfig: Readonly<Omit<MiddlewareConfig, 'ignore' | 'match' | 'options'>> = {
  enableMiddleware: true,
}

export const enum ConfigKey {
  namespace = 'demo',
  config = 'demoConfig',
  middlewareConfig = 'demoMiddlewareConfig',
  componentName = 'demoComponent',
  middlewareName = 'demoMiddleware'
}

export enum Msg {
  AuthFailed = 'Authentication Failed',
}

