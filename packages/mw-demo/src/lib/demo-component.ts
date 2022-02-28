import {
  App,
  Init,
  Provide,
  Scope,
  ScopeEnum,
} from '@midwayjs/decorator'

import { Config } from './types'

import { getConfigFromApp } from '~/index'
import { Application } from '~/interface'


@Provide()
@Scope(ScopeEnum.Singleton)
export class DemoComponent {

  @App() private readonly app: Application

  protected config: Config

  @Init()
  async init(): Promise<void> {
    const config = getConfigFromApp(this.app)
    this.config = config
  }

}

