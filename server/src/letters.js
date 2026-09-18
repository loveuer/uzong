const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export function buildLetters(audioBaseUrl = '') {
  const baseUrl = audioBaseUrl.replace(/\/$/, '')

  return ALPHABET.map((uppercase) => {
    const lowercase = uppercase.toLowerCase()
    const audioKey = `letters/en-US/${lowercase}.mp3`

    return {
      uppercase,
      lowercase,
      audioKey,
      audioUrl: baseUrl ? `${baseUrl}/${audioKey}` : null,
    }
  })
}
