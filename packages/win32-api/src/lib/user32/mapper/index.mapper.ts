import type { MultipleChoiceMapperList, MultipleChoiceMapperSet } from 'win32-def/types'

import * as GetClassInfoExW from './GetClassInfoExW.mapper.js'


export const multipleChoiceMapperList: MultipleChoiceMapperList = new Map()
export const multipleChoiceMapperSet: MultipleChoiceMapperSet = new Set()

multipleChoiceMapperList.set(GetClassInfoExW.funcName, multipleChoiceMapperSet)
multipleChoiceMapperSet.add(GetClassInfoExW.GetClassInfoExW_mapper)

