import cors from 'cors'
import express from 'express'
import { buildLetters } from './letters.js'

function parseOrigins(value) {
  return value.split(',').map((origin) => origin.trim()).filter(Boolean)
}

export function createApp({
  audioBaseUrl = process.env.AUDIO_BASE_URL ?? '',
  corsOrigins = process.env.CORS_ORIGINS ?? 'http://localhost:6616',
} = {}) {
  const app = express()
  const allowedOrigins = parseOrigins(corsOrigins)

  app.disable('x-powered-by')
  app.use(cors({
    origin(origin, callback) {
      callback(null, !origin || allowedOrigins.includes(origin))
    },
  }))
  app.use(express.json({ limit: '64kb' }))

  app.get('/health', (_request, response) => {
    response.json({ status: 'ok', service: 'zongzong-learning-api' })
  })

  app.get('/api/v1/letters', (_request, response) => {
    response.json({
      data: buildLetters(audioBaseUrl),
      meta: {
        accent: 'en-US',
        audioMode: audioBaseUrl ? 'recorded' : 'speech-synthesis-fallback',
      },
    })
  })

  app.use((_request, response) => {
    response.status(404).json({ error: 'not_found' })
  })

  app.use((error, _request, response, _next) => {
    console.error(error)
    response.status(500).json({ error: 'internal_server_error' })
  })

  return app
}
