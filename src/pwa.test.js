import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const indexHtml = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
const manifest = JSON.parse(readFileSync(new URL('../public/manifest.webmanifest', import.meta.url), 'utf8'))

describe('iPad Web App 配置', () => {
  it('支持从主屏幕以独立窗口启动', () => {
    expect(indexHtml).toContain('name="apple-mobile-web-app-capable" content="yes"')
    expect(indexHtml).toContain('name="apple-mobile-web-app-title" content="粽粽学习乐园"')
    expect(indexHtml).toContain('viewport-fit=cover')
    expect(indexHtml).toContain('rel="manifest" href="/manifest.webmanifest"')
    expect(manifest).toMatchObject({
      name: '粽粽学习乐园',
      start_url: '/',
      scope: '/',
      display: 'standalone',
    })
  })

  it('禁止页面缩放', () => {
    expect(indexHtml).toContain('maximum-scale=1')
    expect(indexHtml).toContain('user-scalable=no')
  })
})
