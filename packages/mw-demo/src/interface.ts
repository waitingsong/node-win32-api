import { IMidwayApplication, IMidwayContext } from '@midwayjs/core'
import { Context as KoaContext } from '@midwayjs/koa'

import {
  Config,
  ConfigKey,
  MiddlewareConfig,
} from './lib/index'


export {
  JsonObject,
  JsonResp,
  JsonType,
  NpmPkg,
} from '@waiting/shared-types'

declare module '@midwayjs/core/dist/interface' {
  // 将配置合并到 MidwayConfig 中
  interface MidwayConfig {
    [ConfigKey.config]: Config
    [ConfigKey.middlewareConfig]: MiddlewareConfig
  }
}

// declare module '@midwayjs/core' {
//   interface Context {
//     jwtState: JwtState
//   }
// }


export {
  IMidwayApplication,
  IMidwayContainer,
  IMiddleware,
  NextFunction,
} from '@midwayjs/core'
export type Application = IMidwayApplication<Context>
export type Context = IMidwayContext<KoaContext>

