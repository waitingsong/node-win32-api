import assert from 'node:assert/strict'

import {
  Config as _Config,
  Init,
  Inject,
  Provide,
} from '@midwayjs/core'
import type { Context } from '@mwcp/share'

import { Config, ConfigKey } from './types'


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

