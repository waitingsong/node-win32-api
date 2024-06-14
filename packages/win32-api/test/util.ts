#!/usr/bin/env tsx
import { $ } from 'zx'


export async function isWinLocaleChinese(): Promise<boolean> {
  const res = await $`powershell -Command "Get-WinSystemLocale"`
  const isWinChinese = res.stdout.includes('zh-CN') || res.stdout.includes('zh-Hans')
  return isWinChinese
}

