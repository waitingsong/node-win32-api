
import type { Config, ConfigKey, MiddlewareConfig } from './lib/types.js'


export { AutoConfiguration as Configuration } from './configuration.js'
export * from './app/index.controller.js'
export type * from './interface.js'
export * from './lib/index.js'
export * from './middleware/index.middleware.js'

declare module '@midwayjs/core/dist/interface.js' {
  interface MidwayConfig {
    [ConfigKey.config]: Partial<Config>
    [ConfigKey.middlewareConfig]: Partial<MiddlewareConfig>
  }
}

