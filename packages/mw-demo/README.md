# [@mwcp/demo](https://www.npmjs.com/package/@mwcp/demo) 

Demo Component for [Midway.js]


## Installation
```sh
npm i @mwcp/demo
```


## Configuration

### Enable Plugin

Edit `${app_root}/src/configuration.ts`:

```ts
import { join } from 'node:path'
import { ILifeCycle, Configuration  } from '@midwayjs/core'
import * as demo from '@mwcp/demo'

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
  imports: [ demo ],
})
export class ContainerConfiguration implements ILifeCycle { }

```

### Add Configurations

### Swagger API
- start `npm run dev`
- open `http://localhost:7001/swagger-ui/index.html` in browser

## License
[MIT](LICENSE)


[Midway.js]: https://midwayjs.org/

