import {
  Controller,
  Get,
} from '@midwayjs/core'
import { ApiResponse } from '@midwayjs/swagger'
import { MConfig } from '@mwcp/share'

import { ConfigKey, Msg } from '##/lib/types.js'
import type { Config } from '##/lib/types.js'

import { DefaultApi } from './default.types.js'


@Controller(DefaultApi.base)
export class DefaultComponentController {

  @MConfig(ConfigKey.config) private readonly config: Config

  @Get(DefaultApi.hello)
  @ApiResponse({
    type: 'string',
    description: Msg.hello,
  })
  async hello(): Promise<string> {
    void this.config
    return Msg.hello
  }

}

