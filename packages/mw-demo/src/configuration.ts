/* eslint-disable import/max-dependencies */
import assert from 'node:assert'

import {
  App,
  Config,
  Configuration,
  MidwayEnvironmentService,
  MidwayInformationService,
  ILifeCycle,
  ILogger,
  Inject,
  Logger,
} from '@midwayjs/core'
import {
  Application,
  IMidwayContainer,
  registerMiddleware,
} from '@mwcp/share'

import * as DefulatConfig from './config/config.default.js'
import * as LocalConfig from './config/config.local.js'
import * as UnittestConfig from './config/config.unittest.js'
import { useComponents } from './imports.js'
import {
  Config as Conf,
  ConfigKey,
  MiddlewareConfig,
} from './lib/types.js'
import { DemoMiddleware } from './middleware/index.middleware.js'


@Configuration({
  namespace: ConfigKey.namespace,
  importConfigs: [
    {
      default: DefulatConfig,
      local: LocalConfig,
      unittest: UnittestConfig,
    },
  ],
  imports: useComponents,
})
export class AutoConfiguration implements ILifeCycle {

  @App() readonly app: Application

  @Inject() protected readonly environmentService: MidwayEnvironmentService
  @Inject() protected readonly informationService: MidwayInformationService
  @Logger() protected readonly logger: ILogger

  @Config(ConfigKey.config) protected readonly config: Conf
  @Config(ConfigKey.middlewareConfig) protected readonly mwConfig: MiddlewareConfig

  async onReady(container: IMidwayContainer): Promise<void> {
    void container
    assert(
      this.app,
      'this.app undefined. If start for development, please set env first like `export MIDWAY_SERVER_ENV=local`',
    )

    if (this.config.enableDefaultRoute && this.mwConfig.ignore) {
      this.mwConfig.ignore.push(new RegExp(`/_${ConfigKey.namespace}/.+`, 'u'))
    }

    const isDevelopmentEnvironment = this.environmentService.isDevelopmentEnvironment()
    const { enableMiddleware } = this.mwConfig

    if (enableMiddleware && isDevelopmentEnvironment) {
      registerMiddleware(this.app, DemoMiddleware)
    }

    this.logger.info(`[${ConfigKey.componentName}] onReady`)
  }

}

