import assert from 'node:assert/strict'

import {
  Init,
  Inject,
  Provide,
} from '@midwayjs/core'
import { Context, MConfig } from '@mwcp/share'

import { Config, ConfigKey } from './types.js'


@Provide()
export class Demo2Component {

  @MConfig(ConfigKey.config) protected readonly config: Config

  @Inject() readonly ctx: Context

  @Init()
  async init(): Promise<void> {
    assert(this.config)
    assert(this.ctx)
    assert(this.ctx.startTime)
  }

}

