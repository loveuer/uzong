import { config } from 'dotenv'
import { createApp } from './app.js'

config({ quiet: true })

const port = Number(process.env.PORT ?? 8080)
const server = createApp().listen(port, '0.0.0.0', () => {
  console.log(`Zongzong API listening on 0.0.0.0:${port}`)
})

function shutdown() {
  server.close(() => process.exit(0))
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
