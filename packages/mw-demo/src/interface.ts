import { IMidwayApplication, IMidwayContext } from '@midwayjs/core'
import { Context as KoaContext } from '@midwayjs/koa'
import { MiddlewareConfig } from '@waiting/shared-types'

import { Config } from './lib/index'


export {
  JsonObject,
  JsonResp,
  JsonType,
  MiddlewareConfig,
  NpmPkg,
} from '@waiting/shared-types'

declare module '@midwayjs/core' {
  interface Application{
    demoConfig: Config
    demoMiddlewareConfig: MiddlewareConfig
  }

  // interface Context {
  //   jwtState: JwtState
  // }
}

export {
  IMidwayApplication,
  IMidwayContainer,
  IMiddleware,
  NextFunction,
} from '@midwayjs/core'
export type Application = IMidwayApplication<Context>
export type Context = IMidwayContext<KoaContext>

