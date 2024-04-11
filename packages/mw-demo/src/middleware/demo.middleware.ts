import { Middleware } from '@midwayjs/core'
import {
  Context,
  IMiddleware,
  NextFunction,
} from '@mwcp/share'


/**
 * 对于 `application/json` 响应类型，将 ctx.body 包裹成 JsonResp 格式数据
 */
@Middleware()
export class DemoMiddleware implements IMiddleware<Context, NextFunction> {

  // static getName(): string {
  //   const name = 'DemoWrapMiddleware'
  //   return name
  // }

  match(ctx?: Context) {
    const flag = !! ctx
    return flag
  }

  resolve() {
    return middleware
  }

}

// #region impl

async function middleware(
  ctx: Context,
  next: NextFunction,
): Promise<void> {

  void ctx
  await next()

}

