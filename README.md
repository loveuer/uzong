# 粽粽学习乐园

一个以可爱粽子角色为品牌形象、面向低龄儿童的益智学习 Web App。项目规划为数字、字母、单词三类内容，目前完成数字类的「数字排排队」「谁不见了？」和「数字找朋友」三个小游戏。

## 当前玩法

- 首页用三个独立入口展示数字、字母、单词三大类，游戏页面不再占用空间显示分类导航。
- 数字乐园内展示三个小游戏入口；字母和单词入口暂时展示预告页。
- 「数字排排队」：页面上方随机展示 1–9，孩子从 1 开始依次点击，正确数字会进入下方对应的火车格子。
- 「谁不见了？」：每题隐藏 1–9 中的一个数字，孩子从三个选项中找出答案；基础模式按数字顺序展示，挑战模式会将八个数字和问号完全打乱，答完五题完成一轮。
- 「数字找朋友」：每轮把三个数字与对应数量的苹果、香蕉和小汽车卡片配对，完成三组后进入下一轮，答完五轮通关。
- 点错时保留原数字并给出提示；需要帮助时可点击「给我提示」。
- 放好全部数字后显示完成反馈，可重新洗牌再玩。
- 界面优先为 Pad 设计，重点适配 768×1024 与 1024×768，同时兼容手机与桌面尺寸。
- 三个游戏在 Pad 横竖屏下均完整容纳于一屏，操作过程中无需上下滚动。
- 数字卡片采用低饱和粉彩色和深色文字，减少大面积高饱和色带来的视觉疲劳。
- 支持鼠标、触屏和键盘操作。
- 支持添加到 iPad 主屏幕，并以独立 Web App 窗口运行。

## 技术栈

- Vite + React
- React Router
- Tailwind CSS
- Zustand
- Vitest

当前玩法不需要持久化或多人数据，因此没有引入后端。后续确有账号、学习记录同步等需求时，再使用 Gin + GORM。

## 品牌素材

- 页面 Logo：`public/brand/zongzong-logo.svg`
- 512px PNG Logo：`public/brand/zongzong-logo-512.png`
- 浏览器 favicon：`public/favicon.svg`、`public/favicon-32.png`
- Apple Touch Icon：`public/apple-touch-icon.png`
- Web App Manifest：`public/manifest.webmanifest`

## 本地运行

需要 Node.js 20.19 或更高版本。

```bash
npm install
npm run dev
```

开发服务器默认监听 `0.0.0.0:6616`，本机可通过 `http://localhost:6616` 访问。

## 在 iPad 上全屏使用

Safari 普通标签页不能由网页自动隐藏地址栏。请用 Safari 打开已部署的网站，点击「分享」→「添加到主屏幕」，再从主屏幕打开「粽粽学习乐园」，即可在不显示 Safari 工具栏的独立窗口中使用。

页面已适配 iPad 横竖屏安全区和动态视口。数字排序的卡片在 768px 竖屏下约为 68px，1024px 横屏下约为 90px，并保持 1–9 完整单行展示。

## 页面路由

| 路径 | 页面 |
| --- | --- |
| `/` | 学习分类首页 |
| `/numbers` | 数字乐园 |
| `/numbers/sort` | 数字排排队 |
| `/numbers/missing` | 谁不见了？ |
| `/numbers/match` | 数字找朋友 |
| `/letters` | 字母天地预告页 |
| `/words` | 单词森林预告页 |

页面导航由 React Router 管理，支持浏览器前进、后退和直接刷新深层路径。

## 检查与构建

```bash
npm test
npm run build
```

## 部署到 Cloudflare Workers

项目通过 `wrangler.toml` 将 `dist` 作为 Workers 静态资源发布，并配置了 SPA fallback，因此 React Router 的深层路径可以直接打开和刷新。

首次部署前登录 Cloudflare，然后执行：

```bash
npx wrangler login
npm run deploy
```

## 项目结构

```text
src/
├── components/                # 站点布局和共享视觉组件
├── pages/                     # 与路由对应的页面组件
├── App.jsx                    # React Router 路由表
├── content.js                 # 分类、游戏入口和配色数据
├── game.js                    # 数字排序规则与状态
├── game.test.js               # 数字排序流程测试
├── missingNumberGame.js       # 找缺失数字的规则与状态
├── missingNumberGame.test.js  # 找缺失数字流程测试
├── matchingNumberGame.js      # 数字与数量配对规则与状态
├── matchingNumberGame.test.js # 数字配对流程测试
├── index.css                  # Tailwind 入口及少量动画
└── main.jsx                   # React 与 BrowserRouter 入口
```

## 后续建议

1. 数字类可继续添加数量比较、数字邻居、简单加减法。
2. 字母类可添加字母排序、大小写配对。
3. 单词类可添加图片认词、字母拼词。
4. 若要记录长期学习进度，再设计用户系统和后端数据表。

开发约定与扩展边界见 [AGENTS.md](./AGENTS.md)。
