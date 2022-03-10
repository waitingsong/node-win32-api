import {
  Config as _Config,
  Controller,
  Get,
} from '@midwayjs/decorator'

import { TestRespBody } from '@/root.config'
import { Context } from '~/interface'
import {
  Config,
  ConfigKey,
  MiddlewareConfig,
} from '~/index'


@Controller('/')
export class HomeController {

  @_Config(ConfigKey.config) protected readonly config: Config
  @_Config(ConfigKey.middlewareConfig) protected readonly mwConfig: MiddlewareConfig

  @Get('/')
  async home(ctx: Context): Promise<TestRespBody> {
    const { cookies, header, url } = ctx
    const config = this.config
    const mwConfig = this.mwConfig
    const res = {
      config,
      mwConfig,
      cookies,
      header,
      url,
    }
    return res
  }

}

