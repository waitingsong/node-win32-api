import {
  Config as _Config,
  Controller,
  Get,
} from '@midwayjs/core'
import { ApiResponse } from '@midwayjs/swagger'

import { DefaultApi } from './default.types.js'

import { Config, ConfigKey, Msg } from '##/lib/types.js'


@Controller(DefaultApi.base)
export class DefaultComponentController {

  @_Config(ConfigKey.config) private readonly config: Config

  @Get(DefaultApi.hello)
  @ApiResponse({
    type: 'string',
    description: Msg.hello,
  })
  async hello(): Promise<string > {
    void this.config
    return Msg.hello
  }

}

