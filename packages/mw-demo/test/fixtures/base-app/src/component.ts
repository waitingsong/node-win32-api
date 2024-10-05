import {
  Controller,
  Get,
  Inject,
} from '@midwayjs/core'
import { MConfig } from '@mwcp/share'
import type { Context } from '@mwcp/share'

import { apiBase, apiMethod } from './types/api-test.js'
import { Demo2Component, DemoComponent } from './types/lib-index.js'
import { ConfigKey } from './types/lib-types.js'
import type { Config, MiddlewareConfig } from './types/lib-types.js'
import type { RespData } from './types/root.config.js'


@Controller(apiBase.root)
export class HomeController {

  @MConfig(ConfigKey.config) protected readonly config: Config
  @MConfig(ConfigKey.middlewareConfig) protected readonly mwConfig: MiddlewareConfig

  @Inject() protected readonly demoComponent: DemoComponent
  @Inject() protected readonly demo2Component: Demo2Component

  @Get(`/${apiMethod.component}`)
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

