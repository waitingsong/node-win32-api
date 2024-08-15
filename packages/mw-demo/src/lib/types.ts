import type { BaseConfig } from '@mwcp/share'
import type { MiddlewareConfig as MWConfig } from '@waiting/shared-types'


export enum ConfigKey {
  namespace = 'demo',
  config = 'demoConfig',
  middlewareConfig = 'demoMiddlewareConfig',
  componentName = 'demoComponent',
  middlewareName = 'demoMiddleware',
}

export enum Msg {
  hello = 'hello world',
  AuthFailed = 'Authentication Failed',
}


export interface Config extends BaseConfig {
  /**
   * Enable default http route, eg. /hello
   * @default false
   */
  enableDefaultRoute?: boolean | undefined
}

export interface MiddlewareOptions {
  debug: boolean
}
export type MiddlewareConfig = MWConfig<MiddlewareOptions>

