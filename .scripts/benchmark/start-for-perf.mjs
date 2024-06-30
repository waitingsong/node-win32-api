
process.env.MIDWAY_SERVER_ENV = 'unittest'
process.env['NODE_ENV'] = 'unittest'

import { Bootstrap } from '@midwayjs/bootstrap'

process.on('message', data => {
  if (data.action === 'collect_mem') {
    process.send({ action: 'collect_mem_result', data: process.memoryUsage()})
  } else if (data.action === 'gc') {
    console.log('invoke global.gc')
    global.gc()
  }
})


Bootstrap.run()
