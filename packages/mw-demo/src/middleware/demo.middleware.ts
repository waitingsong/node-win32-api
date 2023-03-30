import { Middleware } from '@midwayjs/core'
import type { Context, IMiddleware, NextFunction } from '@mwcp/share'

import {
  DemoComponent,
  Demo2Component,
} from '../lib/index'
import { ConfigKey } from '../lib/types'
import {
  getMiddlewareConfig,
  matchFunc,
} from '../util/common'


@Middleware()
export class DemoMiddleware implements IMiddleware<Context, NextFunction> {
  static getName(): string {
    const name = ConfigKey.middlewareName
    return name
  }

  match(ctx?: Context) {
    if (ctx) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (! ctx.state) {
        ctx.state = {}
      }
    }

    const flag = matchFunc(ctx)
    return flag
  }

  resolve() {
    return middleware
  }

}


async function middleware(
  ctx: Context,
  next: NextFunction,
): Promise<void> {

  const { app } = ctx

  const mwConfig = getMiddlewareConfig(app)
  void mwConfig

  const demoComponent = await app.getApplicationContext().getAsync(DemoComponent) // singleton
  void demoComponent
  const demo2Component = await ctx.requestContext.getAsync(Demo2Component) // request
  void demo2Component

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return next()
}


