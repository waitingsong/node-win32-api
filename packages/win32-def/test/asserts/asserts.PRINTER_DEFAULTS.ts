import assert from 'node:assert/strict'



import * as DS from '../../src/index.struct.js'
import * as DU from '../../src/index.union.js'
import * as ST from '../../src/lib/struct/index.struct.types.js'
import * as UT from '../../src/lib/union/index.union.types.js'

import { StructFactoryReturnType } from '~/index.js'


export function ast_PRINTER_DEFAULTS(struct: StructFactoryReturnType<ST.PRINTER_DEFAULTS, true>): void {
  assert(struct)

  Object.keys(struct).forEach((key) => {
    assert(typeof struct[key] !== 'undefined')
  })

  const { pDatatype, pDevMode, DesiredAccess } = struct
  assert(pDatatype === '')
  assert(DesiredAccess === 0)

  ast_DEVMODEWStruct(pDevMode)
}

export function ast_DEVMODEWStruct(struct: ST.DEVMODEW): void {
  assert(struct)

  Object.keys(struct).forEach((key) => {
    assert(typeof struct[key] !== 'undefined')
  })

  const { dmDeviceName, dmSpecVersion } = struct
  console.log({ dmDeviceName, dmSpecVersion })
  assert(dmDeviceName === '')
  assert(dmSpecVersion === 0)

  ast_pDevMode_DUMMYUNIONNAME(struct.DUMMYUNIONNAME)
  ast_pDevMode_DUMMYUNIONNAME2(struct.DUMMYUNIONNAME2)
}


export function ast_pDevMode_DUMMYUNIONNAME(union: UT.DEVMODEW_DUMMYUNIONNAME): void {
  assert(union)

  Object.keys(union).forEach((key) => {
    assert(typeof union[key] !== 'undefined')
  })

  const { DUMMYSTRUCTNAME, DUMMYSTRUCTNAME2, dmPosition } = union

  assert(DUMMYSTRUCTNAME)
  assert(DUMMYSTRUCTNAME2)
  assert(dmPosition)

  assert(DUMMYSTRUCTNAME.dmCopies === 0)

  assert(DUMMYSTRUCTNAME2.dmPosition.x === 0)
  assert(DUMMYSTRUCTNAME2.dmDisplayFixedOutput === 0)

  assert(dmPosition.x === 0)
  assert(dmPosition.y === 0)
}


export function ast_pDevMode_DUMMYUNIONNAME2(union: UT.DEVMODEW_DUMMYUNIONNAME2): void {
  assert(union)

  Object.keys(union).forEach((key) => {
    assert(typeof union[key] !== 'undefined')
  })

  assert(union.dmDisplayFlags === 0)
  assert(union.dmNup === 0)
}



export function ast_PRINTER_INFO_1(struct: StructFactoryReturnType<ST.PRINTER_INFO_1, true>): void {
  assert(struct)

  Object.keys(struct).forEach((key) => {
    assert(typeof struct[key] !== 'undefined')
  })


  const {
    Flags,
    pDescription,
    pName,
    pComment,
  } = struct

  assert(Flags === 0)
  assert(pDescription === '')
  assert(pName === '')
  assert(pComment === '')
}
