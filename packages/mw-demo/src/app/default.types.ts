import { ConfigKey } from '##/lib/types.js'


export class DefaultApi {
  static readonly base = `/_${ConfigKey.namespace}`
  static readonly hello = '/hello'
}
