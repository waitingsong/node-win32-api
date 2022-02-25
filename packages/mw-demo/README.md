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

@Configuration({
  imports: [
    demo,
  ],
  importConfigs: [join(__dirname, 'config')],
})
export class ContainerConfiguration implements ILifeCycle { }

```

### Add Configurations


## License
[MIT](LICENSE)

