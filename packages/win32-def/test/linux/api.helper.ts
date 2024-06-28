import * as D from '##/index.def.js'
import * as S from '##/index.struct.js'
import * as T from '##/index.types.js'


// #region Win32

export type LibLibm = T.FLib<Libm>

export class DefLibm implements T.LibDefBase {
  [x: string]: T.FnDefFullParams
  static ceil = [D.FLOAT, [D.FLOAT]]
}

export class Libm implements T.LibDef2Type<typeof DefLibm> {
  ceil: (x: T.FLOAT) => T.FLOAT
}

