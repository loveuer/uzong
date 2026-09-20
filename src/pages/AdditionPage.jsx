import Celebration from '../components/Celebration'
import ReplayButton from '../components/ReplayButton'
import { ADDITION_TOTAL_ROUNDS, useAdditionGame } from '../additionGame'

function FruitGroup({ count, side, fruit }) {
  return (
    <div role="img" className="relative flex min-h-32 flex-col items-center justify-center rounded-3xl border-2 border-white bg-white/90 p-3 shadow-sm md:min-h-40 md:p-4" aria-label={`${side}有 ${count} 个${fruit.name}`}>
      <span className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-xl bg-rose-100 text-xl font-black text-rose-700 md:h-11 md:w-11 md:text-2xl">{count}</span>
      <div className="flex max-w-xs flex-wrap items-center justify-center gap-1 pt-7 md:gap-2 md:pt-5">
        {Array.from({ length: count }, (_, index) => <span key={index} className="text-4xl leading-none md:text-6xl" aria-hidden="true">{fruit.emoji}</span>)}
      </div>
    </div>
  )
}

function FruitCollection({ count, fruit }) {
  return (
    <div role="img" className="flex flex-wrap items-center justify-center gap-0.5" aria-label={`合起来有 ${count} 个${fruit.name}`}>
      {Array.from({ length: count }, (_, index) => <span key={index} className="text-3xl leading-none md:text-4xl" aria-hidden="true">{fruit.emoji}</span>)}
    </div>
  )
}

export default function AdditionPage() {
  const { fruit, left, right, answer, options, round, solved, mistakes, feedback, selected, finished, choose, nextRound, restart } = useAdditionGame()
  const revealed = feedback === 'correct' || feedback === 'complete'
  const message = finished
    ? '五道加法题都完成啦！'
    : feedback === 'wrong'
      ? `再数一数，两边的${fruit.name}要全部算进去哦`
      : feedback === 'correct'
        ? `${left} 个和 ${right} 个合在一起，一共是 ${answer} 个！`
        : `数一数，两边的${fruit.name}合起来有多少个？`

  return (
    <main id="main" className="mx-auto flex w-full max-w-6xl flex-1 items-center px-3 pb-3 md:pb-4 lg:px-6">
      <section className="relative w-full overflow-hidden rounded-[2rem] border-4 border-white bg-white/90 p-4 shadow-2xl shadow-rose-200/60 md:rounded-[2.5rem] lg:p-6">
        {finished && <Celebration />}

        <div className="relative mb-3 flex items-center justify-between gap-3">
          <div>
            <div className="mb-1.5 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-rose-500">
              <span className="h-2 w-2 rounded-full bg-rose-400" /> 数字小游戏 · 第 4 关
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-800 md:text-4xl">水果加一加</h1>
            <p className="mt-1 text-sm font-semibold text-slate-500 md:text-base">把两边的水果合在一起</p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="rounded-2xl bg-rose-50 px-4 py-2 text-center ring-1 ring-rose-100">
              <span className="block text-[10px] font-bold text-rose-500">题目</span>
              <strong className="text-lg text-rose-700">{round} / {ADDITION_TOTAL_ROUNDS}</strong>
            </div>
            <ReplayButton onClick={restart} label="重新开始" />
          </div>
        </div>

        <div className="relative rounded-3xl bg-rose-50/70 p-3 md:p-4">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-5">
            <FruitGroup count={left} side="左边" fruit={fruit} />
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-100 text-3xl font-black text-amber-600 shadow-sm md:h-14 md:w-14 md:text-4xl" aria-hidden="true">+</span>
            <FruitGroup count={right} side="右边" fruit={fruit} />
          </div>

          <div className="mt-3 flex items-center justify-center gap-3 rounded-2xl bg-white/85 px-4 py-2 text-3xl font-black text-slate-700 md:text-4xl" aria-label={`${left} 加 ${right} 等于${revealed ? answer : '多少'}`}>
            <span>{left}</span>
            <span className="text-amber-500">+</span>
            <span>{right}</span>
            <span className="text-slate-400">=</span>
            <span className={revealed ? 'animate-pop text-emerald-600' : 'text-sky-500'}>{revealed ? answer : '?'}</span>
          </div>
        </div>

        <div className="relative my-2 flex min-h-11 flex-wrap items-center justify-center gap-3 text-center" aria-live="polite">
          <p className={`rounded-full px-4 py-1.5 text-sm font-black md:text-base ${
            feedback === 'wrong' ? 'bg-rose-100 text-rose-700' : revealed ? 'bg-emerald-100 text-emerald-700' : 'bg-white text-slate-500'
          }`}>
            {message}
          </p>
          {feedback === 'correct' && (
            <button type="button" onClick={nextRound} aria-label="进入下一题" className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-2 text-sm font-black text-white shadow-md shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-600 active:scale-95">
              <span className="text-2xl" aria-hidden="true">➡️</span> 下一题
            </button>
          )}
        </div>

        {!revealed ? (
          <div className="relative rounded-3xl bg-sky-50/80 p-3 md:p-4">
            <h2 className="mb-3 text-center text-sm font-black text-slate-700 md:text-base">选一选，一共有几个？</h2>
            <div className="mx-auto grid max-w-2xl grid-cols-3 gap-3">
              {options.map((number) => {
                const wrong = feedback === 'wrong' && selected === number
                return (
                  <button
                    key={number}
                    type="button"
                    onClick={() => choose(number)}
                    aria-label={`选择答案 ${number}`}
                    className={`h-20 rounded-2xl border-2 text-3xl font-black shadow-sm transition md:h-24 md:rounded-3xl md:text-4xl ${
                      wrong
                        ? 'animate-wiggle border-rose-200 bg-rose-100 text-rose-700 ring-4 ring-rose-200'
                        : 'border-white bg-white text-slate-700 hover:-translate-y-1 hover:border-sky-200 hover:bg-sky-50 active:scale-95'
                    }`}
                  >
                    {number}
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="relative flex min-h-24 items-center justify-between gap-4 rounded-3xl bg-emerald-50 p-3 ring-1 ring-emerald-100 md:px-6">
            <div className="flex min-w-20 items-center gap-2 text-emerald-700">
              <span className="text-3xl" aria-hidden="true">🧺</span>
              <strong className="text-3xl font-black md:text-4xl">{answer}</strong>
            </div>
            <div className="flex-1"><FruitCollection count={answer} fruit={fruit} /></div>
            {finished && <ReplayButton onClick={restart} label="再玩一轮" celebration />}
          </div>
        )}

        <span className="sr-only" aria-live="polite">已答对 {solved} 题，错误 {mistakes} 次</span>
      </section>
    </main>
  )
}
