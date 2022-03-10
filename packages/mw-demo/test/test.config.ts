import {
  Config,
  initialMiddlewareConfig,
  initMiddlewareOptions,
  MiddlewareConfig,
  MiddlewareOptions,
} from '~/index'


export { demoMiddlewareConfig as mwConfig } from '~/config/config.unittest'

export const config: Config = {
  secret: '',
}
export const mwOptions: MiddlewareOptions = {
  ...initMiddlewareOptions,
}
export const mwConfigNoOpts: Omit<MiddlewareConfig, 'match' | 'ignore' | 'options'> = {
  ...initialMiddlewareConfig,
}

