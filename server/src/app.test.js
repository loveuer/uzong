import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { createApp } from './app.js'

describe('zongzong learning api', () => {
  it('returns service health', async () => {
    const response = await request(createApp()).get('/health')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ status: 'ok', service: 'zongzong-learning-api' })
  })

  it('returns A-Z metadata with R2 audio URLs', async () => {
    const response = await request(createApp({ audioBaseUrl: 'https://audio.example.com/' })).get('/api/v1/letters')

    expect(response.status).toBe(200)
    expect(response.body.data).toHaveLength(26)
    expect(response.body.data[0]).toEqual({
      uppercase: 'A',
      lowercase: 'a',
      audioKey: 'letters/en-US/a.mp3',
      audioUrl: 'https://audio.example.com/letters/en-US/a.mp3',
    })
    expect(response.body.data[25].uppercase).toBe('Z')
    expect(response.body.meta).toEqual({ accent: 'en-US', audioMode: 'recorded' })
  })

  it('uses browser speech as fallback before audio is configured', async () => {
    const response = await request(createApp({ audioBaseUrl: '' })).get('/api/v1/letters')

    expect(response.body.data[0].audioUrl).toBeNull()
    expect(response.body.meta.audioMode).toBe('speech-synthesis-fallback')
  })

  it('returns JSON for unknown routes', async () => {
    const response = await request(createApp()).get('/missing')

    expect(response.status).toBe(404)
    expect(response.body).toEqual({ error: 'not_found' })
  })
})
