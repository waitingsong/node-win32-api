import * as info from '@midwayjs/info'
import * as koa from '@midwayjs/koa'


/* c8 ignore next 4 */
const CI = !! (process.env['MIDWAY_SERVER_ENV'] === 'unittest'
  || process.env['MIDWAY_SERVER_ENV'] === 'local'
  || process.env['NODE_ENV'] === 'unittest'
  || process.env['NODE_ENV'] === 'local'
)

export const useComponents: IComponentInfo[] = []
if (CI && ! useComponents.includes(koa)) {
  useComponents.push(koa)
  useComponents.push(info)
}

export interface IComponentInfo {
  Configuration: unknown
  [key: string]: unknown
}

