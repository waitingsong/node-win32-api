import { Middleware } from '@midwayjs/decorator'

import { ConfigKey, getConfigFromApp, getMiddlewareConfigFromApp } from '~/index'
import { Context, IMiddleware, NextFunction } from '~/interface'
import { matchFunc } from '~/util/common'


@Middleware()
export class DemoMiddleware implements IMiddleware<Context, NextFunction> {
  static getName(): string {
    const name = ConfigKey.middlewareName
    return name
  }

  match(ctx?: Context) {
    return matchFunc(ctx)
  }

  resolve() {
    return demoMiddleware
  }

}


async function demoMiddleware(
  ctx: Context,
  next: NextFunction,
): Promise<void> {

  const { app } = ctx

  const config = getConfigFromApp(app)
  const mwConfig = getMiddlewareConfigFromApp(app)
  void config
  void mwConfig

  return next()
}


