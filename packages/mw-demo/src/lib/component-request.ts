import assert from 'assert/strict'

import {
  Config as _Config,
  Init,
  Inject,
  Provide,
} from '@midwayjs/decorator'

import {
  Config,
  ConfigKey,
} from './index'

import { Context } from '~/interface'


@Provide()
export class Demo2Component {

  @_Config(ConfigKey.config) protected readonly config: Config

  @Inject() readonly ctx: Context

  @Init()
  async init(): Promise<void> {
    assert(this.config)
    assert(this.ctx)
    assert(this.ctx.startTime)
  }

}

