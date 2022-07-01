# Migrate to v13

## Breaking Changes

### win32-def
- Use `pkg.exports` instead of namespace exports
- ANSI data type not supported
- Suffix `_Struct` of Struct type removed  
  eg. `M.POINT_Struct` -> `M.POINT`

| Before                                     | Current                                      |
| ------------------------------------------ | -------------------------------------------- |
| `import { DModel as M } from 'win32-def`   | `import * as M from 'win32-def'`             |
| `import { DTypes as W } from 'win32-def'`  | `import * as W from 'win32-def/common.def' ` |
| `import { DStruct as DS} from 'win32-def'` | `import * as DS from 'win32-def/struct.def'` |
| `import { DUnion} from 'win32-def'`        | `import * as DU from 'win32-def/union.def'`  |


### win32-api
- Declarations of `DStructExt` (path `src/lib/data-struct-ext`) moved into `win-def`
- Export of `DStructExt` renamed to `DStruct`
- Terminated-null `\0` from `WCHAR_String` in Struct removed  
  Example [DISPLAY_DEVICEW]


## Notable Changes

### win32-api
- Export promised API with `win32-api/promise` via `pkg.exports`

| API namespace | Import                                         |
| ------------- | ---------------------------------------------- |
| Comctrl32     | `import { Comctl32 } from 'win32-api/promise'` |
| Kernel32      | `import { Kernel32 } from 'win32-api/promise'` |
| Ntdll         | `import { Ntdll } from 'win32-api/promise'`    |
| User32        | `import { User32 } from 'win32-api/promise'`   |



[DISPLAY_DEVICEW]: https://raw.githubusercontent.com/waitingsong/node-win32-api/main/packages/win32-api/test/user32/51.user32.EnumDisplayDevicesW.test.ts

