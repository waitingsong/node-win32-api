import assert from 'assert/strict'

import {
  App,
  Config as _Config,
  Init,
  Provide,
  Scope,
  ScopeEnum,
} from '@midwayjs/decorator'

import { ConfigKey } from './config'
import { Config } from './types'

import type { Application } from '~/interface'


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

