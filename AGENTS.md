# AGENTS.md

本文件供后续开发者和 AI 编码助手使用。修改代码前先阅读本文件与 `README.md`。

## 产品目标

「粽粽学习乐园」是以可爱粽子角色为品牌形象、面向低龄儿童的益智学习 Web App，规划三个学习分类：

1. 数字类
2. 字母类
3. 单词类

数字类当前包含四个游戏：

- 「数字排排队」：上方打乱展示 1–9，孩子必须从 1 开始依次选择，正确数字进入下方九个槽位，错误选择不改变排序进度。
- 「谁不见了？」：每题隐藏 1–9 中的一个数字，并提供三个不重复选项。基础模式保持顺序并在缺失位置显示问号；挑战模式将八个可见数字和问号完全打乱。答对后进入下一题，完成五题后通关，错误选择不推进题目；切换难度会重置本轮。
- 「数字找朋友」：每轮随机展示三个数字和三张对应数量的物品卡片，物品使用苹果、香蕉和小汽车；主要操作是在两侧卡片间拖动连线，同时保留依次点击两张卡片的替代操作。完成三组后进入下一轮，五轮后通关，错误配对不推进进度。
- 「水果加一加」：每题随机使用苹果、香蕉、橘子、草莓或葡萄 emoji 展示两组相同水果，两个加数为 1–5 且总数不超过 9。孩子从三个数字中选择合并后的总数；答对后展示完整算式与合并结果，完成五题通关，错误选择不推进题目。

字母类当前包含一个游戏：

- 「字母点点读」：点击 A–Z 卡片播放美式英语字母名称，可切换大小写显示；优先读取 R2 录音，未配置或播放失败时使用浏览器 SpeechSynthesis。

首页负责展示数字、字母、单词三个一级入口；具体游戏页面不重复显示一级分类导航。尚未开发的分类可以进入预告页，但不要在游戏主区域占位。

## Pad First（首要原则）

- Pad 是本项目的首要目标设备和验收基准，不是手机布局的放大版，也不是桌面布局的缩小版。默认先为 768×1024 竖屏和 1024×768 横屏完成设计，再适配手机和桌面。
- 显示设计以 Pad 为先：优先确定 Pad 上的信息层级、内容宽度、网格、字号、间距和完整游戏视野；横竖屏均不得出现核心内容裁切、控件重叠或不必要的横向滚动。
- 交互设计以 Pad 触控为先：主要点击目标不得小于 48×48px，建议达到 56×56px；相邻目标保留足够间距，常用操作应容易触达，并提供即时、明确的点击反馈。
- 任何功能都不能依赖鼠标悬停、右键或精细指针操作；手势操作若存在，必须同时提供可见的按钮替代方案。
- 连线操作使用 Pointer Events，同时支持触屏和鼠标；成功连线必须保留在画面中，错误连线需同时通过线条样式和文字反馈表达。
- 手机和桌面属于二次适配，不能为了两端布局牺牲 Pad 的显示密度或触控体验。数字排序的 1–9 在 Pad 上应完整保持为一排，只有手机端可以横向滚动。
- Pad 上的单个游戏必须完整容纳在一屏内，不出现页面纵向滚动；通关、答错和下一题等状态也必须满足。非游戏页面和小屏手机可在内容确有需要时纵向滚动。
- iPad 应支持从 Safari「添加到主屏幕」后以独立 Web App 窗口运行；保留 `manifest.webmanifest`、Apple Web App meta、`viewport-fit=cover` 和安全区适配。Safari 普通标签页不能作为全屏验收环境。
- 完成功能后至少验证两种 Pad 视口，并实际走通“进入分类 → 开始游戏 → 完成游戏 → 重新开始/返回”的触控路径。

## 技术约束

- 前端固定使用 React、React Router、Tailwind CSS、Zustand，构建工具为 Vite。
- 组件使用函数组件和 Hooks；状态仅在跨组件或属于游戏流程时放入 Zustand。
- 页面级导航必须由 React Router 和 URL 管理，不得用组件内 `view`、`currentPage` 等状态模拟路由。
- 样式优先使用 Tailwind 工具类，只有动画、全局规则等不适合工具类的内容写入 `src/index.css`。
- 后端固定使用 Node.js + Express，数据库访问使用 Drizzle ORM + PostgreSQL。前后端独立部署，不要把 Express 打包进 Cloudflare Workers 前端。
- 字母录音存放在 Cloudflare R2，Express 只返回内容与音频元数据，不代理音频文件；前端在录音未配置时可使用 SpeechSynthesis 兜底。
- 不提前引入组件库、请求库或其他抽象层；出现实际需求后再添加。

## 路由约定

- 路由统一定义在 `src/App.jsx`；页面组件放在 `src/pages/`，共享布局放在 `src/components/`。
- 当前路径为 `/`、`/numbers`、`/numbers/sort`、`/numbers/missing`、`/numbers/match`、`/numbers/addition`、`/letters`、`/letters/listen`、`/words`；新增页面时使用语义清晰的层级路径。
- 内部导航使用 React Router 的 `Link` 或 `Navigate`，不要使用普通 `<a>` 触发整页刷新，也不要直接操作 `window.location`。
- 未匹配路径回到首页。Cloudflare Workers 部署必须保留 `wrangler.toml` 中的 `not_found_handling = "single-page-application"`，保证深层 URL 刷新可用。

## 代码边界

- `src/App.jsx`：集中维护路由表，不放具体页面实现。
- `src/components/SiteLayout.jsx`：全站 Header、返回导航、背景与 Footer。
- `src/components/Celebration.jsx`：游戏共享的通关动画。
- `src/components/FullscreenButton.jsx`：首页全屏切换及 iPad Safari 不支持时的主屏幕安装提示。
- `src/components/ReplayButton.jsx`：游戏内统一的图形化重新开始/再玩按钮。
- `src/pages/`：首页、分类页和各游戏页面。
- `src/content.js`：分类入口、游戏入口和共享数字配色。
- `src/game.js`：可测试的游戏规则、洗牌和 Zustand 状态。
- `src/game.test.js`：游戏核心行为测试。
- `src/missingNumberGame.js`：找缺失数字的出题规则和独立 Zustand 状态。
- `src/missingNumberGame.test.js`：找缺失数字的核心行为测试。
- `src/matchingNumberGame.js`：数字与数量配对的出题规则和独立 Zustand 状态。
- `src/matchingNumberGame.test.js`：数字配对的核心行为测试。
- `src/additionGame.js`：图片加法的出题规则和独立 Zustand 状态。
- `src/additionGame.test.js`：图片加法的正常、错误和通关流程测试。
- `src/letterAudio.js`：字母录音播放与浏览器语音合成兜底。
- `src/letterAudio.test.js`：字母发音地址和兜底行为测试。
- `src/index.css`：Tailwind 入口、全局基础样式和关键帧动画。
- `server/src/app.js`：Express 应用和 API 路由，不负责监听端口。
- `server/src/index.js`：后端进程入口和优雅退出。
- `server/src/db/`：Drizzle 数据库连接和 PostgreSQL schema。

新增小游戏时，优先将其规则放到独立文件，并为异常输入和通关流程补测试。不要让多个小游戏共用一个不断膨胀的 store。

## 交互与视觉约定

- 品牌名称固定为「粽粽学习乐园」，Logo 使用 `public/brand/zongzong-logo.svg`，favicon 使用 `public/favicon.svg`。
- 面向儿童：点击目标要大，反馈即时，文案简短且积极，避免惩罚性表述。
- 重新开始、再玩一次等关键流程按钮必须以无需识字也能理解的醒目图形为主、文字为辅；统一使用 `ReplayButton`，不要退化为纯文字按钮。
- 首页全屏按钮必须保留能力检测和 iPad 主屏幕安装提示；不得假设所有 Safari 版本都支持 Fullscreen API，也不得尝试自动进入全屏。
- 不只依赖颜色表达状态；重要结果同时使用文字或图形。
- 所有可交互元素必须可通过键盘操作，并提供清晰的焦点样式和可访问名称。
- 动画必须尊重 `prefers-reduced-motion`。
- 同时保证最低 320px 手机宽度和桌面端可用，但这些适配不得改变 Pad First 的优先级。
- 大面积内容避免高饱和颜色和过重阴影，数字卡片使用柔和底色搭配清晰的深色文字。

## 修改与验证流程

1. 开始前明确本次改动的可验证成功标准。
2. 只改与任务直接相关的内容，保持实现简单。
3. 修复 Bug 时先补能复现问题的测试，再修复。
4. 新增规则时覆盖正常流程、错误选择和完成状态。
5. 提交前运行：

```bash
npm test
npm run build
npx wrangler deploy --dry-run
(cd server && npm test)
```

如果新增了命令、目录、玩法或后端依赖，同步更新 `README.md` 和本文件。
