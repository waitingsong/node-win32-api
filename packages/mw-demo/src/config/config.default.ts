import { MiddlewareConfig } from '../interface'
import {
  initialConfig,
  initialMiddlewareConfig,
} from '../lib/config'
import { Config } from '../lib/types'


export const demoConfig: Config = {
  ...initialConfig,
}

export const demoMiddlewareConfig: MiddlewareConfig = {
  ...initialMiddlewareConfig,
}

