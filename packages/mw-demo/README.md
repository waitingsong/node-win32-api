# [@mw-components/demo](https://www.npmjs.com/package/@mw-components/demo) 
demo for midway framework.


## Installation
```sh
npm i @mw-components/demo
```


## Configuration

### Enable Plugin

Edit `${app_root}/src/configuration.ts`:

```ts
import { join } from 'path'
import { ILifeCycle } from '@midwayjs/core'
import { Configuration } from '@midwayjs/decorator'
import * as demo from '@mw-components/demo'

import * as DefaultConfig from './config/config.default.js'
import * as LocalConfig from './config/config.local.js'
import * as UnittestConfig from './config/config.unittest.js'

@Configuration({
  importConfigs: [
    {
      default: DefaultConfig,
      local: LocalConfig,
      unittest: UnittestConfig,
    },
  ],
  imports: [
    demo,
  ],
})
export class ContainerConfiguration implements ILifeCycle { }

```

### Add Configurations

### Swagger API
- start `npm run build && npm run dev`
- open `http://localhost:7001/swagger-ui/index.html` in browser

## License
[MIT](LICENSE)

