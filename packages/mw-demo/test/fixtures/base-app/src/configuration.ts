import 'tsconfig-paths/register'
import { Configuration } from '@midwayjs/core'


@Configuration({
  imports: [ require('../../../../src'), ],
  // importConfigs: [join(__dirname, 'config')],
})
export class AutoConfiguration {
}
