import { Link, Outlet, useLocation } from 'react-router-dom'

function Header({ compact }) {
  const { pathname } = useLocation()
  const insideNumberGame = pathname.startsWith('/numbers/')
  const backTo = insideNumberGame ? '/numbers' : '/'
  const backLabel = insideNumberGame ? '数字乐园' : '返回首页'

  return (
    <header className={`mx-auto flex w-full max-w-6xl items-center justify-between ${compact ? 'px-4 py-3 md:px-6' : 'px-5 py-5 sm:px-8'}`}>
      <Link to="/" className="group flex items-center gap-3 text-left" aria-label="返回粽粽学习乐园首页">
        <span className={`grid place-items-center rounded-2xl bg-[#fff3cf] shadow-md shadow-emerald-100 transition group-hover:-rotate-3 group-hover:scale-105 ${compact ? 'h-10 w-10' : 'h-12 w-12'}`}>
          <img src="/brand/zongzong-logo.svg" alt="" className={compact ? 'h-10 w-10' : 'h-12 w-12'} />
        </span>
        <span>
          <strong className="block text-lg leading-none tracking-wide text-slate-800">粽粽学习乐园</strong>
          <small className="mt-1 block text-[11px] font-bold tracking-[0.18em] text-emerald-600">边玩边学 · 快乐成长</small>
        </span>
      </Link>
      {pathname !== '/' ? (
        <Link
          to={backTo}
          className="inline-flex min-h-12 items-center rounded-2xl bg-white/90 px-4 py-2.5 text-sm font-black text-slate-600 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md active:scale-95"
        >
          ← {backLabel}
        </Link>
      ) : (
        <div className="hidden items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-amber-600 shadow-sm ring-1 ring-amber-100 sm:flex">
          <span aria-hidden="true">⭐</span> 今天也要加油呀！
        </div>
      )}
    </header>
  )
}

export default function SiteLayout() {
  const { pathname } = useLocation()
  const gamePage = pathname.startsWith('/numbers/')

  return (
    <div className={`app-shell flex flex-col overflow-hidden bg-[#fff9ed] ${gamePage ? 'game-shell' : ''}`}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <Header compact={gamePage} />
      <Outlet />
      {!gamePage && <footer className="pb-8 text-center text-xs font-semibold text-slate-400">边玩边学 · 粽粽学习乐园</footer>}
    </div>
  )
}
