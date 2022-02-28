import { Middleware } from '@midwayjs/decorator'

import { ConfigKey, getConfigFromApp } from '~/index'
import { Context, IMiddleware, NextFunction } from '~/interface'
import { matchFunc } from '~/util/common'


@Middleware()
export class DemoMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return demoMiddleware
  }

  static getName(): string {
    const name = ConfigKey.middlewareName
    return name
  }

  match(ctx?: Context) {
    return matchFunc(ctx)
  }
}


async function demoMiddleware(
  ctx: Context,
  next: NextFunction,
): Promise<void> {

  const { app } = ctx

  const config = getConfigFromApp(app)
  void config

  return next()
}


