import { isWinLocaleChinese } from './util.js'


const isWinChinese = await isWinLocaleChinese()

// for win7/8
export const calcLpszClass = Buffer.from('CalcFrame\0', 'ucs2')
// for win10
// export const calcLpszWindow = Buffer.from('Calculator\0', 'ucs2')
// export const calcLpszWindowNotepad = Buffer.from('Notepad\0', 'ucs2')
export const calcLpszWindow = isWinChinese ? '计算器' : 'Calculator'
export const calcLpszWindowNotepad = isWinChinese ? '记事本' : 'Notepad'

export const calcLpszClassNotepad = Buffer.from('Notepad\0', 'ucs2')
export const calcLpszClassNotepadEdit = Buffer.from('Edit\0', 'ucs2')

export const calcLpszNotepad = 'Notepad'
export const calcLpszNotepadEdit = 'Edit'

/** GitHub CI */
export const githubPrinterNames: string[] = [
  'Microsoft Print to PDF',
  'Microsoft XPS Document Writer',
]

export const processDataTypes: string[] = [
  'RAW',
  // 'RAW[FF appended]',
  // 'RAW[FF auto]',
  // 'NT EMF 1.003',
  // 'NT EMF 1.006',
  // 'NT EMF 1.007',
  // 'NT EMF 1.008',
  'NT EMF',
  'TEXT',
  'XPS2GDI',
]

