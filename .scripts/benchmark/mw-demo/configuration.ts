// @ts-nocheck
import 'tsconfig-paths/register'
import assert from 'node:assert'
import { join } from 'node:path'

import { ILifeCycle } from '@midwayjs/core'
import { App, Config, Configuration } from '@midwayjs/decorator'
import * as koa from '@midwayjs/koa'

import {
  ConfigKey,
  MiddlewareConfig,
} from './lib/types'
import { DemoMiddleware } from './middleware/index.middleware'

import { Application, IMidwayContainer } from '~/interface'


@Configuration({
  namespace: ConfigKey.namespace,
  importConfigs: [join(__dirname, 'config')],
  imports: [
    koa,
  ],
})
export class AutoConfiguration implements ILifeCycle {

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

  // @ts-ignore
  app.getMiddleware().insertLast(DemoMiddleware)
}

