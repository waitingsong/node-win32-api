import 'tsconfig-paths/register'

import { join } from 'path'

import { App, Config, Configuration } from '@midwayjs/decorator'

import { DemoMiddleware } from './middleware/demo.middleware'

import { ConfigKey, MiddlewareConfig } from '~/index'
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

