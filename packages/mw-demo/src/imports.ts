import * as info from '@midwayjs/info'
import * as koa from '@midwayjs/koa'
import * as swagger from '@midwayjs/swagger'
import * as otel from '@mwcp/otel'


/* c8 ignore next 4 */
const CI = !! (process.env['MIDWAY_SERVER_ENV'] === 'unittest'
  || process.env['MIDWAY_SERVER_ENV'] === 'local'
  || process.env['NODE_ENV'] === 'unittest'
  || process.env['NODE_ENV'] === 'local'
)

export const useComponents: IComponentInfo[] = []
if (CI) {
  useComponents.push(otel)
  useComponents.push(koa)
  useComponents.push(info)
  useComponents.push(swagger)
}

export interface IComponentInfo {
  Configuration: unknown
  [key: string]: unknown
}

