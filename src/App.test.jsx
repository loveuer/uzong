import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from './App'

const routes = [
  ['/', '选择你的学习乐园'],
  ['/numbers', '今天玩哪个？'],
  ['/numbers/sort', '数字排排队'],
  ['/numbers/missing', '谁不见了？'],
  ['/numbers/match', '数字找朋友'],
  ['/letters', '字母天地'],
  ['/words', '单词森林'],
]

function renderPath(path) {
  return renderToString(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('app routes', () => {
  it.each(routes)('%s 可以直接渲染对应页面', (path, heading) => {
    const html = renderPath(path)

    expect(html).toContain(heading)
  })

  it.each(['/numbers/sort', '/numbers/missing', '/numbers/match'])('%s 使用单屏游戏布局', (path) => {
    const html = renderPath(path)

    expect(html).toContain('game-shell')
    expect(html).not.toContain('边玩边学 · 粽粽学习乐园')
  })

  it('数字找朋友使用三种物品图标', () => {
    const html = renderPath('/numbers/match')

    expect(html).toContain('🍎')
    expect(html).toContain('🍌')
    expect(html).toContain('🚗')
    expect(html).not.toContain('🌱')
  })
})
