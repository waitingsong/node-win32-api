import {
  Controller,
  Get,
} from '@midwayjs/core'
import { MConfig } from '@mwcp/share'
import type { Context } from '@mwcp/share'

import { apiBase, apiMethod } from './types/api-test.js'
import { ConfigKey } from './types/lib-types.js'
import type { Config, MiddlewareConfig } from './types/lib-types.js'
import type { RespData } from './types/root.config.js'


@Controller(apiBase.root)
export class HomeController {

  @MConfig(ConfigKey.config) protected readonly config: Config
  @MConfig(ConfigKey.middlewareConfig) protected readonly mwConfig: MiddlewareConfig

  @Get(apiMethod.root)
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

