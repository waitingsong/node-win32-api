import assert from 'assert/strict'

import {
  App,
  Config as _Config,
  Init,
  Inject,
  Provide,
  Scope,
  ScopeEnum,
} from '@midwayjs/decorator'

import {
  Config,
  ConfigKey,
} from './index'

import { Application } from '~/interface'


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

