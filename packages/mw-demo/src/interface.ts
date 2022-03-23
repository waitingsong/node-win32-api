import { IMidwayApplication, IMidwayContext } from '@midwayjs/core'
import { Context as KoaContext } from '@midwayjs/koa'


export {
  JsonObject,
  JsonResp,
  JsonType,
  NpmPkg,
} from '@waiting/shared-types'

export {
  IMidwayApplication,
  IMidwayContainer,
  IMiddleware,
  NextFunction,
} from '@midwayjs/core'
export type Application = IMidwayApplication<Context>
export type Context = IMidwayContext<KoaContext>

