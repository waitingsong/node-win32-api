import {
  Config,
  ConfigKey,
  MiddlewareConfig,
} from './lib/index'


export { AutoConfiguration as Configuration } from './configuration'
export * from './lib/index'
export {
  getComponentConfig,
  getMiddlewareConfig,
} from './util/common'
export * from './middleware/demo.middleware'


declare module '@midwayjs/core' {
  interface MidwayConfig {
    [ConfigKey.config]: Config
    [ConfigKey.middlewareConfig]: MiddlewareConfig
  }
  // interface Context {
  //   jwtState: JwtState
  // }
}
// OR
// declare module '@midwayjs/core/dist/interface' {
// }

