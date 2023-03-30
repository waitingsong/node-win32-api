import assert from 'node:assert/strict'

import {
  App,
  Config as _Config,
  Init,
  Provide,
  Scope,
  ScopeEnum,
} from '@midwayjs/core'
import type { Application } from '@mwcp/share'

import { Config, ConfigKey } from './types'


@Provide()
@Scope(ScopeEnum.Singleton)
export class DemoComponent {

  @_Config(ConfigKey.config) protected readonly config: Config

  @App() readonly app: Application

  @Init()
  async init(): Promise<void> {
    assert(this.config)
    assert(this.app)
  }

}

