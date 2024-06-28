import type { MultipleChoiceMapperList, MultipleChoiceMapperSet } from 'win32-def/types'

import * as GetPrinterW from './GetPrinterW.mapper.js'


export const multipleChoiceMapperList: MultipleChoiceMapperList = new Map()
export const multipleChoiceMapperSet: MultipleChoiceMapperSet = new Set()

multipleChoiceMapperList.set(GetPrinterW.funcName, multipleChoiceMapperSet)
multipleChoiceMapperSet.add(GetPrinterW.GetPrinterW_mapper)

