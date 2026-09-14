import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from './App'

const routes = [
  ['/', '选择你的学习乐园'],
  ['/numbers', '今天玩哪个？'],
  ['/numbers/sort', '数字排排队'],
  ['/numbers/missing', '谁不见了？'],
  ['/letters', '字母天地'],
  ['/words', '单词森林'],
]

describe('app routes', () => {
  it.each(routes)('%s 可以直接渲染对应页面', (path, heading) => {
    const html = renderToString(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>,
    )

    expect(html).toContain(heading)
  })
})
