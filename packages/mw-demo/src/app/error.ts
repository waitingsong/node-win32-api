import { HttpStatus, MidwayHttpError } from '@midwayjs/core'


export class ApiNotEnabledHttpError extends MidwayHttpError {
  constructor() {
    super('Api not enabled', HttpStatus.UNAUTHORIZED)
  }
}

