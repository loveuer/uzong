# 粽粽学习 API

独立的 Express API，使用 Drizzle ORM 与 PostgreSQL。前端仍由 Cloudflare Workers 部署，字母录音存放在 Cloudflare R2，本服务返回内容、音频地址，并在后续承载学习进度。

## 本地运行

```bash
cp .env.example .env
npm install
npm run dev
```

默认监听 `0.0.0.0:8080`。

## 当前接口

- `GET /health`：服务健康检查。
- `GET /api/v1/letters`：返回 A–Z、大小写、R2 音频键与地址。未配置 `AUDIO_BASE_URL` 时，前端使用浏览器语音合成兜底。

## 数据库

配置 `DATABASE_URL` 后执行：

```bash
npm run db:generate
npm run db:migrate
```

当前只定义 `game_progress` 学习进度表。账号、鉴权和进度接口应在明确产品流程后再实现。

## 检查

```bash
npm test
```
