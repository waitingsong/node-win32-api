import { initialConfig } from '../lib/config'
import { Config } from '../lib/types'


export const keys = 123456
export const koa = {
  port: 7001,
}

export const demoConfig: Config = {
  ...initialConfig,
  enableDefaultRoute: true,
}


