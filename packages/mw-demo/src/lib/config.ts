import {
  Config,
  MiddlewareConfig,
  MiddlewareOptions,
} from './types'


export const initialConfig: Readonly<Config> = {
  enableDefaultRoute: false,
}
export const initMiddlewareOptions: MiddlewareOptions = {
  debug: false,
}
export const initialMiddlewareConfig: Readonly<Omit<MiddlewareConfig, 'ignore' | 'match' | 'options'>> = {
  enableMiddleware: true,
}

