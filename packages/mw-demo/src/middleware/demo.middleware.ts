import { Middleware } from '@midwayjs/decorator'

import { ConfigKey } from '~/index'
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

  return next()
}


