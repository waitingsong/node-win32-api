
import {
  Config,
  ConfigKey,
  MiddlewareConfig,
} from './lib/types'


export { AutoConfiguration as Configuration } from './configuration'
export * from './lib/index'
export * from './app/index.controller'
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

