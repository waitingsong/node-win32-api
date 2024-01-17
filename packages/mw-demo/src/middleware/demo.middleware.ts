import { Middleware } from '@midwayjs/core'
import {
  Context,
  IMiddleware,
  JsonResp,
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

const mimeJson = 'application/json'

async function middleware(
  ctx: Context,
  next: NextFunction,
): Promise<void> {

  await next()

  // 判断是否为 json 响应
  const contentType: string | number | string[] | undefined = ctx.response.header['content-type']
  if (! contentType || typeof contentType === 'number') {
    return
  }
  else if (typeof contentType === 'string' && ! contentType.includes(mimeJson)) {
    return
  }
  else if (Array.isArray(contentType) && ! contentType.includes(mimeJson)) {
    return
  }

  wrapRespToJson(ctx)
}


/**
 * 对于 `application/json` 响应类型，将 ctx.body 包裹成 JsonResp 格式数据
 */
function wrapRespToJson(ctx: Context): void {

  const { status } = ctx
  const body = ctx.body as JsonResp | void

  // 判断是否已经包裹过
  if (body && typeof body === 'object' && typeof body.code === 'number') {
    if (body.code === status) {
      return
    }
    else if (body.code >= 600) {
      return
    }
    else if (typeof body.data !== 'undefined') {
      return
    }
  }

  if (ctx.status === 204) { // no content
    ctx.status = 200 // force return JsonResp<T> structure
  }
  ctx.body = genJsonBody(ctx, body)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function genJsonBody(ctx: Context, payload: JsonResp | void): JsonResp {
  const { status, reqId } = ctx
  const body: JsonResp = {
    code: status >= 200 && status < 400 ? 0 : status,
    reqId,
  }

  if (Array.isArray(payload)) {
    body.data = payload
  }
  else if (payload && typeof payload === 'object' && Object.keys(payload).length > 0) {
    const { codeKey, ...data } = payload
    if (typeof data !== 'undefined') {
      body.data = data
    }
    if (typeof codeKey === 'string') {
      body.codeKey = codeKey
    }
  }
  else if (typeof payload !== 'undefined') {
    body.data = payload
  }

  return body
}

