# DLL Wrapper 

## Usage

```ts
import { 
  user32FindWindowEx, 
  winspoolGetDefaultPrinter,
} from 'win32-api/fun'

const printerName = await winspoolGetDefaultPrinter()

const child = spawn('notepad.exe')
const hWnd = await user32FindWindowEx(0, 0, 'Notepad', null)
```

## List


### User32

- [`user32FindWindowEx`](./src/lib/user32/api.ts)

### Winspool

- [`winspoolGetDefaultPrinter`](./src/lib/winspool/api.ts)
- [`winspoolOpenPrinter`](./src/lib/winspool/api.ts)

