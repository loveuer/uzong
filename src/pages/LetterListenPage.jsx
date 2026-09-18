import { useEffect, useMemo, useState } from 'react'
import { createLetterPlayer, LETTERS } from '../letterAudio'

const AUDIO_BASE_URL = import.meta.env.VITE_LETTER_AUDIO_BASE_URL ?? ''

export default function LetterListenPage() {
  const [letterCase, setLetterCase] = useState('uppercase')
  const [selected, setSelected] = useState(null)
  const player = useMemo(() => createLetterPlayer({ audioBaseUrl: AUDIO_BASE_URL }), [])

  useEffect(() => () => player.stop(), [player])

  const pronounce = (letter) => {
    setSelected(letter)
    player.pronounce(letter)
  }

  const shownLetter = selected && (letterCase === 'uppercase' ? selected : selected.toLowerCase())

  return (
    <main id="main" className="mx-auto flex w-full max-w-6xl flex-1 items-center px-3 pb-3 md:pb-4 lg:px-6">
      <section className="relative w-full overflow-hidden rounded-[2rem] border-4 border-white bg-white/90 p-4 shadow-2xl shadow-sky-200/60 md:rounded-[2.5rem] lg:p-6">
        <div className="relative mb-3 flex items-center justify-between gap-3">
          <div>
            <div className="mb-1.5 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-sky-600">
              <span className="h-2 w-2 rounded-full bg-sky-400" /> 字母小游戏 · 第 1 关
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-800 md:text-4xl">字母点点读</h1>
            <p className="mt-1 text-sm font-semibold text-slate-500 md:text-base">点一下字母，听听它怎么读</p>
          </div>

          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-sky-50 p-1.5 shadow-sm" role="group" aria-label="字母大小写">
            <button
              type="button"
              aria-pressed={letterCase === 'uppercase'}
              onClick={() => setLetterCase('uppercase')}
              className={`min-h-12 min-w-16 rounded-xl px-3 text-lg font-black transition ${letterCase === 'uppercase' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-500'}`}
            >
              A <span className="block text-[9px] leading-none">大写</span>
            </button>
            <button
              type="button"
              aria-pressed={letterCase === 'lowercase'}
              onClick={() => setLetterCase('lowercase')}
              className={`min-h-12 min-w-16 rounded-xl px-3 text-lg font-black transition ${letterCase === 'lowercase' ? 'bg-white text-sky-700 shadow-sm' : 'text-slate-500'}`}
            >
              a <span className="block text-[9px] leading-none">小写</span>
            </button>
          </div>
        </div>

        <button
          type="button"
          disabled={!selected}
          onClick={() => pronounce(selected)}
          aria-label={selected ? `再听一次字母 ${selected}` : '请先选择一个字母'}
          className="mb-3 flex min-h-20 w-full items-center justify-center gap-5 rounded-3xl bg-gradient-to-r from-sky-100 to-cyan-50 px-5 text-sky-800 ring-1 ring-sky-200 transition active:scale-[0.99] disabled:text-slate-400"
        >
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-3xl shadow-sm" aria-hidden="true">🔊</span>
          <span className="min-w-20 text-left">
            <strong className="block text-4xl font-black leading-none md:text-5xl">{shownLetter ?? '?'}</strong>
            <span className="mt-1 block text-xs font-bold">{selected ? '再听一次' : '选一个字母'}</span>
          </span>
        </button>

        <div className="rounded-3xl bg-slate-50/90 p-3 md:p-4">
          <h2 className="mb-3 flex items-center justify-center gap-2 text-sm font-black text-slate-600 md:text-base">
            <span aria-hidden="true">☝️</span> 点一点，听声音
          </h2>
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-7 md:grid-cols-9">
            {LETTERS.map((letter) => {
              const active = selected === letter
              const label = letterCase === 'uppercase' ? letter : letter.toLowerCase()
              return (
                <button
                  key={letter}
                  type="button"
                  onClick={() => pronounce(letter)}
                  aria-label={`播放字母 ${letter} 的读音`}
                  aria-pressed={active}
                  className={`aspect-square min-h-14 rounded-2xl border-2 text-2xl font-black shadow-sm transition md:min-h-16 md:rounded-3xl md:text-3xl ${
                    active
                      ? 'animate-pop border-sky-400 bg-sky-500 text-white shadow-sky-200'
                      : 'border-white bg-white text-slate-700 hover:-translate-y-1 hover:border-sky-200 hover:bg-sky-50 active:scale-95'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">{selected ? `正在播放字母 ${selected}` : ''}</p>
      </section>
    </main>
  )
}
