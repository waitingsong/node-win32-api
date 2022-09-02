import 'tsconfig-paths/register'
import { Configuration } from '@midwayjs/decorator'


@Configuration({
  imports: [ require('../../../../src'), ],
  // importConfigs: [join(__dirname, 'config')],
})
export class AutoConfiguration {
}
