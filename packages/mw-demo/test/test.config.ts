import {
  Config,
  initialMiddlewareConfig,
  initMiddlewareOptions,
  MiddlewareConfig,
  MiddlewareOptions,
} from '~/index'


export {
  demoConfig as config,
  demoMiddlewareConfig as mwConfig,
} from '~/config/config.unittest'

export const mwOptions: MiddlewareOptions = {
  ...initMiddlewareOptions,
}
export const mwConfigNoOpts: Omit<MiddlewareConfig, 'match' | 'ignore' | 'options'> = {
  ...initialMiddlewareConfig,
}

