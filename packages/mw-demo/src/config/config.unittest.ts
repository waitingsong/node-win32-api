import { initialConfig } from '../lib/config'
import { Config } from '../lib/types'


export const demoConfig: Config = {
  ...initialConfig,
  enableHelloRoute: true,
}


