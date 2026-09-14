import { Link } from 'react-router-dom'
import { categories } from '../content'

export default function HomePage() {
  return (
    <main id="main" className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pb-16 pt-6 sm:px-8 sm:pt-12">
      <section className="mb-10 text-center sm:mb-14">
        <span className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-xs font-black tracking-wider text-emerald-600 shadow-sm ring-1 ring-emerald-100">
          🌈 今天想探索什么？
        </span>
        <h1 className="text-4xl font-black tracking-tight text-slate-800 sm:text-6xl">选择你的学习乐园</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm font-semibold leading-7 text-slate-500 sm:text-lg">每一次点击，都是一次快乐成长</p>
      </section>

      <nav aria-label="学习分类" className="grid gap-5 md:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={category.path}
            className={`group relative block min-h-64 overflow-hidden rounded-[2rem] border-2 bg-gradient-to-br p-7 text-left shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl active:scale-[0.98] ${category.card}`}
          >
            <span className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/45" aria-hidden="true" />
            <span className="absolute -bottom-12 -left-10 h-28 w-28 rounded-full bg-white/35" aria-hidden="true" />
            <span
              className={`relative grid h-24 w-24 place-items-center rounded-[1.75rem] bg-gradient-to-br text-2xl font-black text-white shadow-xl transition group-hover:rotate-3 group-hover:scale-105 ${category.iconColor}`}
              aria-hidden="true"
            >
              {category.icon}
            </span>
            <strong className="relative mt-7 block text-2xl font-black text-slate-800">{category.name}</strong>
            <span className="relative mt-2 block text-sm font-semibold leading-6 text-slate-500">{category.description}</span>
            <span className="relative mt-5 inline-flex items-center gap-2 text-sm font-black text-slate-700">
              {category.active ? '开始探索' : '看看这里'} <span className="transition group-hover:translate-x-1">→</span>
            </span>
            {!category.active && (
              <span className="absolute right-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black text-slate-500 shadow-sm">正在成长</span>
            )}
          </Link>
        ))}
      </nav>
    </main>
  )
}
