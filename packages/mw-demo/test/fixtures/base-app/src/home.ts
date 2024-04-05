import {
  Controller,
  Get,
} from '@midwayjs/core'
import { Context, MConfig } from '@mwcp/share'

import {
  Config,
  ConfigKey,
  MiddlewareConfig,
} from '../../../../dist/lib/types.js'
import { RespData } from '../../../root.config.js'


@Controller('/')
export class HomeController {

  @MConfig(ConfigKey.config) protected readonly config: Config
  @MConfig(ConfigKey.middlewareConfig) protected readonly mwConfig: MiddlewareConfig

  @Get('/')
  async home(ctx: Context): Promise<RespData> {
    const {
      cookies,
      header,
      url,
    } = ctx

    const res = {
      cookies,
      header,
      url,
    }
    return res
  }

}

