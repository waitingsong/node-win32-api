import { MiddlewareConfig as MWConfig } from '@waiting/shared-types'


export interface Config {
  secret: string
}

export interface MiddlewareOptions {
  debug: boolean
}
export type MiddlewareConfig = MWConfig<MiddlewareOptions>

