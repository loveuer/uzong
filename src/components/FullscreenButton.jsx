import { useEffect, useState } from 'react'

function FullscreenIcon({ active }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      {active ? (
        <>
          <path d="M8 18h10V8" />
          <path d="M40 18H30V8" />
          <path d="M8 30h10v10" />
          <path d="M40 30H30v10" />
        </>
      ) : (
        <>
          <path d="M18 8H8v10" />
          <path d="M30 8h10v10" />
          <path d="M8 30v10h10" />
          <path d="M40 30v10H30" />
        </>
      )}
    </svg>
  )
}

function fullscreenElement() {
  return document.fullscreenElement || document.webkitFullscreenElement
}

export default function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    const standaloneQuery = window.matchMedia('(display-mode: standalone)')
    const updateState = () => {
      setIsFullscreen(Boolean(fullscreenElement()))
      setIsStandalone(standaloneQuery.matches || window.navigator.standalone === true)
    }

    updateState()
    document.addEventListener('fullscreenchange', updateState)
    document.addEventListener('webkitfullscreenchange', updateState)
    standaloneQuery.addEventListener?.('change', updateState)
    return () => {
      document.removeEventListener('fullscreenchange', updateState)
      document.removeEventListener('webkitfullscreenchange', updateState)
      standaloneQuery.removeEventListener?.('change', updateState)
    }
  }, [])

  const toggleFullscreen = async () => {
    if (isStandalone) {
      setShowHelp(true)
      return
    }

    const root = document.documentElement
    const request = root.requestFullscreen || root.webkitRequestFullscreen
    const exit = document.exitFullscreen || document.webkitExitFullscreen

    try {
      if (fullscreenElement() && exit) await exit.call(document)
      else if (request) await request.call(root)
      else setShowHelp(true)
    } catch {
      setShowHelp(true)
    }
  }

  const active = isFullscreen || isStandalone
  const label = isFullscreen ? '退出全屏' : isStandalone ? '已全屏' : '全屏'

  return (
    <div className="relative z-50">
      <button
        type="button"
        onClick={toggleFullscreen}
        aria-label={label}
        aria-pressed={active}
        data-fullscreen-button="true"
        className={`inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-2xl p-1.5 font-black shadow-md ring-1 transition hover:-translate-y-0.5 active:scale-95 ${
          active ? 'bg-emerald-100 text-emerald-700 ring-emerald-200' : 'bg-white/90 text-sky-700 ring-sky-100'
        }`}
      >
        <span className={`grid h-9 w-9 place-items-center rounded-xl p-1.5 ${active ? 'bg-white' : 'bg-sky-100'}`}>
          <FullscreenIcon active={active} />
        </span>
        <span className="hidden pr-2 text-sm sm:inline">{label}</span>
      </button>

      {showHelp && (
        <div role="status" className="absolute right-0 top-full mt-3 w-72 max-w-[calc(100vw-2rem)] rounded-3xl border-2 border-white bg-white p-4 text-left shadow-2xl shadow-sky-200/60">
          <button type="button" onClick={() => setShowHelp(false)} aria-label="关闭全屏提示" className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-lg font-black text-slate-500 active:scale-95">
            ×
          </button>
          <strong className="block pr-10 text-base font-black text-slate-800">{isStandalone ? '现在已经是全屏 App' : '在 iPad 上全屏打开'}</strong>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
            {isStandalone ? '使用 iPad 的系统手势返回桌面即可退出。' : 'Safari 不支持直接全屏时，请按下面的步骤操作：'}
          </p>
          {!isStandalone && (
            <div className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-sky-50 px-3 py-3 text-sm font-black text-sky-700">
              <span>⬆️ 分享</span>
              <span aria-hidden="true">→</span>
              <span>➕ 添加到主屏幕</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
