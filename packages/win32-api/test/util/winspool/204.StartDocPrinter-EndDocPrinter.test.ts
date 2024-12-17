import assert from 'node:assert'
import { rm } from 'node:fs/promises'
import { homedir } from 'node:os'

import { fileShortPath, isFileExists, sleep } from '@waiting/shared-core'
import { PRINTER_STATUS } from 'win32-def/consts'
import { DOC_INFO_1_Factory } from 'win32-def/struct'

import { ClosePrinter, EndDocPrinter, GetPrinter, OpenPrinter, StartDocPrinter } from '##/index.util.js'
import { testConfig } from '#@/root.config.js'


describe(fileShortPath(import.meta.url), () => {
  const pName = 'Microsoft Print to PDF'
  const local = 'LBP621C'
  const xps = 'Microsoft XPS Document Writer'

  describe('StartDocPrinter()', () => {
    it(pName, async () => {
      const hwnd = await OpenPrinter(pName)
      assert(hwnd)

      try {
        const info = await GetPrinter({ hPrinter: hwnd, Level: 1 })
        assert(info)
        assert(info.pName === pName, JSON.stringify(info))

        const { payload } = DOC_INFO_1_Factory()
        payload.pDocName = testConfig.pDocName
        payload.pOutputFile = null
        payload.pDatatype = 'RAW'

        // generate a pdf file (zero size)
        const ret = await StartDocPrinter({ hPrinter: hwnd, pDocInfo: payload })
        assert(ret)

        const info6 = await GetPrinter({ hPrinter: hwnd, Level: 6 })
        assert(info6)

        await sleep(500)
        assert(await EndDocPrinter(hwnd), 'EndDocPrinter() failed')
      }
      finally {
        await sleep(500)
        assert(await ClosePrinter(hwnd), 'ClosePrinter() failed')
      }
    })

    it(xps, async () => {
      const hwnd = await OpenPrinter(xps)
      if (! hwnd) { return }

      try {
        const info = await GetPrinter({ hPrinter: hwnd, Level: 1 })
        if (! info) { return }
        assert(info.pName === xps, JSON.stringify(info))

        const { payload } = DOC_INFO_1_Factory()
        payload.pDocName = testConfig.pDocName
        payload.pOutputFile = null
        payload.pDatatype = 'RAW'

        // generate a pdf file (zero size)
        const ret = await StartDocPrinter({ hPrinter: hwnd, pDocInfo: payload })
        assert(ret)
        console.info('StartDocPrinter: ', ret)

        const info6 = await GetPrinter({ hPrinter: hwnd, Level: 6 })
        assert(info6)
        assert(
          info6.dwStatus === PRINTER_STATUS.PRINTER_STATUS_PAUSED || info6.dwStatus === PRINTER_STATUS.unknown,
          info6.dwStatus.toString(),
        )

        await sleep(500)
        assert(await EndDocPrinter(hwnd), 'EndDocPrinter() failed')
      }
      finally {
        await sleep(500)
        assert(await ClosePrinter(hwnd), 'ClosePrinter() failed')
      }
    })

    it(local, async () => {
      const hwnd = await OpenPrinter(local)
      if (! hwnd) { return }

      try {
        const info = await GetPrinter({ hPrinter: hwnd, Level: 1 })
        if (! info) { return }
        assert(info.pName === local, JSON.stringify(info))

        const { payload } = DOC_INFO_1_Factory()
        payload.pDocName = testConfig.pDocName
        payload.pOutputFile = null
        payload.pDatatype = 'RAW'

        // generate a pdf file (zero size)
        const ret = await StartDocPrinter({ hPrinter: hwnd, pDocInfo: payload })
        assert(ret)
        console.info('StartDocPrinter: ', ret)

        const info6 = await GetPrinter({ hPrinter: hwnd, Level: 6 })
        assert(info6)
        assert(info6.dwStatus === PRINTER_STATUS.PRINTER_STATUS_PAUSED, info6.dwStatus.toString())

        await sleep(500)
        assert(await EndDocPrinter(hwnd), 'EndDocPrinter() failed')
      }
      finally {
        await sleep(500)
        assert(await ClosePrinter(hwnd), 'ClosePrinter() failed')
      }
    })

  })
})

