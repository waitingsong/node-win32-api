import { Middleware } from '@midwayjs/decorator'

import {
  ConfigKey,
  DemoComponent,
  Demo2Component,
} from '~/index'
import { Context, IMiddleware, NextFunction } from '~/interface'
import {
  getMiddlewareConfig,
  matchFunc,
} from '~/util/common'


@Middleware()
export class DemoMiddleware implements IMiddleware<Context, NextFunction> {
  static getName(): string {
    const name = ConfigKey.middlewareName
    return name
  }

  match(ctx?: Context) {
    if (ctx) {
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

  const demoComponent = await ctx.requestContext.getAsync(DemoComponent)
  void demoComponent
  const demo2Component = await ctx.requestContext.getAsync(Demo2Component)
  void demo2Component


  return next()
}


