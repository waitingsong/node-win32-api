import assert from 'node:assert/strict'

import {
  Init,
  Inject,
  Provide,
} from '@midwayjs/core'
import { MConfig } from '@mwcp/share'
import type { Context } from '@mwcp/share'

import { ConfigKey } from './types.js'
import type { Config } from './types.js'


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

