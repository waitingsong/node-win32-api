import 'tsconfig-paths/register'
import { App, Config, Configuration } from '@midwayjs/decorator'

import * as DefaultConfig from './config/config.default'
import { ConfigKey } from './lib/config'
import { DemoMiddleware } from './middleware/demo.middleware'

import { Application, MiddlewareConfig, IMidwayContainer } from '~/interface'


@Configuration({
  namespace: ConfigKey.namespace,
  importConfigs: [
    {
      default: DefaultConfig,
      // local: LocalConfig,
      // unittest: TestConfig,
    },
  ],
})
export class AutoConfiguration {

  @App() readonly app: Application

  @Config(ConfigKey.middlewareConfig) protected readonly mwConfig: MiddlewareConfig

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async onReady(_container: IMidwayContainer): Promise<void> {
    if (! this.app) {
      throw new TypeError('this.app invalid')
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

  // @ts-expect-error
  app.getMiddleware().insertLast(DemoMiddleware)
}

