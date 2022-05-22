import 'tsconfig-paths/register'
import assert from 'node:assert'
import { join } from 'node:path'

import { App, Config, Configuration } from '@midwayjs/decorator'

import {
  ConfigKey,
  MiddlewareConfig,
} from './lib/index'
import { DemoMiddleware } from './middleware/index.middleware'

import { Application, IMidwayContainer } from '~/interface'


@Configuration({
  namespace: ConfigKey.namespace,
  importConfigs: [join(__dirname, 'config')],
})
export class AutoConfiguration {

  @App() readonly app: Application

  @Config(ConfigKey.middlewareConfig) protected readonly mwConfig: MiddlewareConfig

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async onReady(_container: IMidwayContainer): Promise<void> {
    assert(this.app, 'this.app must be set')

    const { enableMiddleware } = this.mwConfig
    if (enableMiddleware) {
      registerMiddleware(this.app)
    }
  }

}

function registerMiddleware(
  app: Application,
): void {

  // @ts-expect-error
  app.getMiddleware().insertLast(DemoMiddleware)
}

