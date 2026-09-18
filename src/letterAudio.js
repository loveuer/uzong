export const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export function buildLetterAudioUrl(letter, audioBaseUrl = '') {
  const normalizedLetter = letter.toLowerCase()
  if (!LETTERS.includes(normalizedLetter.toUpperCase())) return null

  const baseUrl = audioBaseUrl.replace(/\/+$/, '')
  return baseUrl ? `${baseUrl}/letters/en-US/${normalizedLetter}.mp3` : null
}

export function createLetterPlayer({
  audioBaseUrl = '',
  AudioClass = globalThis.Audio,
  speechSynthesis = globalThis.speechSynthesis,
  UtteranceClass = globalThis.SpeechSynthesisUtterance,
} = {}) {
  let currentAudio = null
  let requestId = 0

  const speakWithDevice = (letter) => {
    if (!speechSynthesis || typeof UtteranceClass !== 'function') return false

    speechSynthesis.cancel()
    const utterance = new UtteranceClass(letter.toUpperCase())
    utterance.lang = 'en-US'
    utterance.rate = 0.72
    utterance.pitch = 1.05
    speechSynthesis.speak(utterance)
    return true
  }

  const pronounce = (letter) => {
    currentAudio?.pause()
    speechSynthesis?.cancel()
    const currentRequestId = ++requestId
    const audioUrl = buildLetterAudioUrl(letter, audioBaseUrl)

    if (!audioUrl || typeof AudioClass !== 'function') {
      speakWithDevice(letter)
      return 'speech-synthesis'
    }

    let usedFallback = false
    const fallback = () => {
      if (usedFallback || currentRequestId !== requestId) return
      usedFallback = true
      speakWithDevice(letter)
    }

    currentAudio = new AudioClass(audioUrl)
    currentAudio.addEventListener?.('error', fallback, { once: true })

    try {
      currentAudio.play()?.catch(fallback)
      return 'recorded'
    } catch {
      fallback()
      return 'speech-synthesis'
    }
  }

  const stop = () => {
    requestId += 1
    currentAudio?.pause()
    speechSynthesis?.cancel()
  }

  return { pronounce, stop }
}
