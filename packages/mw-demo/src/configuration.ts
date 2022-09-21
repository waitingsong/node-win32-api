import 'tsconfig-paths/register'
import assert from 'node:assert'
import { join } from 'node:path'

import { ILifeCycle } from '@midwayjs/core'
import { App, Config, Configuration } from '@midwayjs/decorator'
import type { Application, IMidwayContainer } from '@mwcp/share'

import { useComponents } from './imports'
import {
  Config as Conf,
  ConfigKey,
  MiddlewareConfig,
} from './lib/types'
import { DemoMiddleware } from './middleware/index.middleware'


@Configuration({
  namespace: ConfigKey.namespace,
  importConfigs: [join(__dirname, 'config')],
  imports: useComponents,
})
export class AutoConfiguration implements ILifeCycle {

  @App() readonly app: Application

  @Config(ConfigKey.config) protected readonly config: Conf
  @Config(ConfigKey.middlewareConfig) protected readonly mwConfig: MiddlewareConfig

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async onReady(_container: IMidwayContainer): Promise<void> {
    assert(
      this.app,
      'this.app undefined. If start for development, please set env first like `export MIDWAY_SERVER_ENV=local`',
    )

    if (this.config.enableDefaultRoute && this.mwConfig.ignore) {
      this.mwConfig.ignore.push(new RegExp(`/${ConfigKey.namespace}/.+`, 'u'))
    }

    const { enableMiddleware } = this.mwConfig
    if (enableMiddleware) {
      registerMiddleware(this.app)
    }
  }

}

function registerMiddleware(
  app: Application,
): void {

  const mwNames = app.getMiddleware().getNames()
  if (mwNames.includes(DemoMiddleware.name)) {
    return
  }

  // @ts-ignore
  app.getMiddleware().insertLast(DemoMiddleware)
}

