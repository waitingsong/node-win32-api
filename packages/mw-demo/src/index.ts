
import {
  Config,
  ConfigKey,
  MiddlewareConfig,
} from './lib/types'


export { AutoConfiguration as Configuration } from './configuration'
export * from './app/index.controller'
export * from './lib/index'
export {
  getComponentConfig,
  getMiddlewareConfig,
} from './util/common'
export * from './middleware/demo.middleware'

// @ts-ignore
declare module '@midwayjs/core/dist/interface' {
  interface MidwayConfig {
    [ConfigKey.config]: Partial<Config>
    [ConfigKey.middlewareConfig]: Partial<MiddlewareConfig>
  }
}

