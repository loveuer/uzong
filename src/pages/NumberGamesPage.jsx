import { Link } from 'react-router-dom'
import { numberGames } from '../content'

export default function NumberGamesPage() {
  return (
    <main id="main" className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-5 pb-16 pt-6 sm:px-8 sm:pt-10">
      <section className="mb-9 text-center sm:mb-12">
        <span className="mb-4 inline-flex rounded-full bg-orange-100 px-4 py-2 text-xs font-black tracking-wider text-orange-700">123 · 数字乐园</span>
        <h1 className="text-4xl font-black tracking-tight text-slate-800 sm:text-5xl">今天玩哪个？</h1>
        <p className="mt-3 font-semibold text-slate-500">选一个小游戏，和数字交朋友</p>
      </section>

      <nav aria-label="数字小游戏" className="grid gap-5 sm:grid-cols-2 sm:gap-7">
        {numberGames.map((game, index) => (
          <Link
            key={game.path}
            to={game.path}
            className={`group relative block min-h-64 overflow-hidden rounded-[2rem] border-2 bg-gradient-to-br p-7 text-left shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl active:scale-[0.98] sm:min-h-80 sm:p-9 ${game.card}`}
          >
            <span className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/45" aria-hidden="true" />
            <span className={`relative grid h-24 w-24 place-items-center rounded-[1.75rem] text-5xl shadow-lg ${game.iconColor}`} aria-hidden="true">
              {game.icon}
            </span>
            <span className="relative mt-7 block text-xs font-black tracking-widest text-slate-500">第 {index + 1} 个游戏</span>
            <strong className="relative mt-2 block text-2xl font-black text-slate-800 sm:text-3xl">{game.name}</strong>
            <span className="relative mt-3 block font-semibold leading-7 text-slate-500">{game.description}</span>
            <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-black text-slate-700">
              开始游戏 <span className="transition group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </nav>
    </main>
  )
}
