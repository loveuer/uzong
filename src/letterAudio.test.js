import { describe, expect, it, vi } from 'vitest'
import { buildLetterAudioUrl, createLetterPlayer, LETTERS } from './letterAudio'

describe('letter audio', () => {
  it('为 A–Z 生成稳定的美式英语录音地址', () => {
    expect(LETTERS).toHaveLength(26)
    expect(buildLetterAudioUrl('A', 'https://audio.example.com/')).toBe('https://audio.example.com/letters/en-US/a.mp3')
    expect(buildLetterAudioUrl('1', 'https://audio.example.com')).toBeNull()
  })

  it('未配置录音时使用设备语音合成', () => {
    const cancel = vi.fn()
    const speak = vi.fn()
    class Utterance {
      constructor(text) {
        this.text = text
      }
    }

    const player = createLetterPlayer({
      speechSynthesis: { cancel, speak },
      UtteranceClass: Utterance,
    })

    expect(player.pronounce('b')).toBe('speech-synthesis')
    expect(speak).toHaveBeenCalledWith(expect.objectContaining({ text: 'B', lang: 'en-US', rate: 0.72 }))
  })

  it('录音加载失败时自动改用设备语音', () => {
    let handleError
    const speak = vi.fn()
    class Audio {
      addEventListener(_event, callback) {
        handleError = callback
      }

      play() {
        return Promise.resolve()
      }

      pause() {}
    }

    const player = createLetterPlayer({
      audioBaseUrl: 'https://audio.example.com',
      AudioClass: Audio,
      speechSynthesis: { cancel: vi.fn(), speak },
      UtteranceClass: class {
        constructor(text) {
          this.text = text
        }
      },
    })

    expect(player.pronounce('C')).toBe('recorded')
    handleError()
    expect(speak).toHaveBeenCalledWith(expect.objectContaining({ text: 'C', lang: 'en-US' }))
  })
})
