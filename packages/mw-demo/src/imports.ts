import * as info from '@midwayjs/info'
import * as koa from '@midwayjs/koa'
import * as swagger from '@midwayjs/swagger'


/* c8 ignore next 4 */
const CI = !! (process.env['MIDWAY_SERVER_ENV'] === 'unittest'
  || process.env['MIDWAY_SERVER_ENV'] === 'local'
  || process.env['NODE_ENV'] === 'unittest'
  || process.env['NODE_ENV'] === 'local'
)

export const useComponents: IComponentInfo[] = []
if (CI) {
  if ( ! useComponents.includes(koa)) {
    useComponents.push(koa)
    useComponents.push(info)
  }
  if ( ! useComponents.includes(swagger)) {
    useComponents.push(swagger)
  }
}

export interface IComponentInfo {
  Configuration: unknown
  [key: string]: unknown
}

