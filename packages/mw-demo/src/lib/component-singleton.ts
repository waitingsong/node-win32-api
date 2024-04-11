import assert from 'node:assert/strict'

import {
  App,
  Init,
  Singleton,
} from '@midwayjs/core'
import { Application, MConfig } from '@mwcp/share'

import { Config, ConfigKey } from './types.js'


@Singleton()
export class DemoComponent {

  @MConfig(ConfigKey.config) protected readonly config: Config

  @App() readonly app: Application

  @Init()
  async init(): Promise<void> {
    assert(this.config)
    assert(this.app)
  }

}

