import {
  Controller,
  Get,
  Inject,
} from '@midwayjs/core'
import { Context, MConfig } from '@mwcp/share'

import { DemoComponent, Demo2Component } from '../../../../dist/lib/index.js'
import {
  Config,
  ConfigKey,
  MiddlewareConfig,
} from '../../../../dist/lib/types.js'
import { apiBase, apiPath } from '../../../api-test.js'
import { RespData } from '../../../root.config.js'


@Controller(apiBase.root)
export class HomeController {

  @MConfig(ConfigKey.config) protected readonly config: Config
  @MConfig(ConfigKey.middlewareConfig) protected readonly mwConfig: MiddlewareConfig

  @Inject() protected readonly demoComponent: DemoComponent
  @Inject() protected readonly demo2Component: Demo2Component

  @Get(`/${apiPath.component}`)
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

