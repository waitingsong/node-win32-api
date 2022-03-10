import {
  Config as _Config,
  Init,
  Provide,
  Scope,
  ScopeEnum,
} from '@midwayjs/decorator'

import {
  Config,
  ConfigKey,
} from './index'


@Provide()
@Scope(ScopeEnum.Singleton)
export class DemoComponent {

  @_Config(ConfigKey.config) protected readonly config: Config

  @Init()
  async init(): Promise<void> {
    void this.config
  }

}

