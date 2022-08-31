import { MiddlewareConfig as MWConfig } from '@waiting/shared-types'


export enum ConfigKey {
  namespace = 'demo',
  config = 'demoConfig',
  middlewareConfig = 'demoMiddlewareConfig',
  componentName = 'demoComponent',
  middlewareName = 'demoMiddleware'
}

export enum Msg {
  AuthFailed = 'Authentication Failed',
}


export interface Config {
  secret: string
}

export interface MiddlewareOptions {
  debug: boolean
}
export type MiddlewareConfig = MWConfig<MiddlewareOptions>

