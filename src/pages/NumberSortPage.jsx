import { useEffect, useState } from 'react'
import Celebration from '../components/Celebration'
import { numberColors } from '../content'
import { NUMBERS, useNumberGame } from '../game'

function NumberTile({ number, placed, selected, feedback, onChoose }) {
  const wrong = selected === number && feedback === 'wrong'

  return (
    <button
      type="button"
      disabled={placed}
      aria-label={placed ? `数字 ${number} 已放好` : `选择数字 ${number}`}
      onClick={() => onChoose(number)}
      className={`number-tile aspect-square rounded-3xl border-2 bg-gradient-to-br text-3xl font-black shadow-md transition-all md:text-4xl lg:text-5xl ${numberColors[number - 1]} ${
        placed ? 'scale-75 cursor-default opacity-0' : 'hover:-translate-y-1 hover:scale-105 active:translate-y-1 active:scale-95'
      } ${wrong ? 'animate-wiggle ring-4 ring-rose-200' : ''}`}
    >
      {number}
    </button>
  )
}

function EmptySlot({ number, filled }) {
  return (
    <div
      aria-label={filled ? `第 ${number} 格是数字 ${number}` : `等待放入第 ${number} 个数字`}
      className={`slot aspect-square min-w-0 rounded-3xl border-2 ${
        filled
          ? `animate-pop bg-gradient-to-br shadow-md ${numberColors[number - 1]}`
          : 'border-dashed border-slate-200 bg-slate-50/80 text-slate-300'
      } grid place-items-center text-3xl font-black md:text-4xl lg:text-5xl`}
    >
      {filled ? number : <span className="text-xl md:text-2xl">?</span>}
    </div>
  )
}

export default function NumberSortPage() {
  const { shuffled, placed, mistakes, feedback, selected, choose, restart } = useNumberGame()
  const [showHint, setShowHint] = useState(false)
  const completed = placed.length === NUMBERS.length
  const nextNumber = placed.length + 1

  useEffect(() => {
    if (!showHint) return undefined
    const timer = window.setTimeout(() => setShowHint(false), 1800)
    return () => window.clearTimeout(timer)
  }, [showHint, nextNumber])

  const restartGame = () => {
    restart()
    setShowHint(false)
  }

  const message = completed
    ? '太棒啦！数字小火车排好队了！'
    : feedback === 'wrong'
      ? `再想一想，要从 ${nextNumber} 开始哦`
      : feedback === 'correct'
        ? '答对啦，继续加油！'
        : '从 1 开始，按顺序点击数字吧'

  return (
    <main id="main" className="mx-auto flex w-full max-w-6xl flex-1 items-center px-3 pb-6 md:pb-8 lg:px-6">
      <section className="relative w-full overflow-hidden rounded-[2rem] border-4 border-white bg-white/90 p-4 shadow-2xl shadow-orange-200/60 md:rounded-[2.5rem] lg:p-7">
        {completed && <Celebration />}

        <div className="relative mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-orange-500">
              <span className="h-2 w-2 rounded-full bg-orange-400" /> 数字小游戏 · 第 1 关
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-800 md:text-4xl">数字排排队</h1>
            <p className="mt-2 text-sm font-semibold text-slate-500 md:text-base">帮数字小火车从 1 到 9 排好队吧！</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-amber-50 px-4 py-2 text-center ring-1 ring-amber-100">
              <span className="block text-[10px] font-bold text-amber-600">进度</span>
              <strong className="text-lg text-amber-600">{placed.length} / 9</strong>
            </div>
            <button type="button" onClick={restartGame} className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-200 active:scale-95">
              ↻ 重新开始
            </button>
          </div>
        </div>

        <div className="relative rounded-3xl bg-orange-50/80 p-3 md:p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-sm font-black text-slate-700 md:text-lg">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-orange-500 text-white">☝</span>
              点击这里的数字
            </h2>
            {!completed && (
              <button type="button" onClick={() => setShowHint(true)} className="rounded-full bg-white px-3 py-1.5 text-xs font-black text-orange-500 shadow-sm transition hover:-translate-y-0.5">
                💡 给我提示
              </button>
            )}
          </div>

          <div className="number-row grid grid-flow-col auto-cols-[4.5rem] gap-2 overflow-x-auto px-0.5 pb-2 md:grid-flow-row md:grid-cols-9 md:auto-cols-auto md:overflow-visible md:pb-0">
            {shuffled.map((number) => (
              <NumberTile key={number} number={number} placed={placed.includes(number)} selected={selected} feedback={feedback} onChoose={choose} />
            ))}
          </div>
        </div>

        <div className="relative my-4 flex min-h-12 items-center justify-center" aria-live="polite">
          <div className={`rounded-full px-5 py-2 text-center text-sm font-black transition-all md:text-base ${
            completed ? 'bg-emerald-100 text-emerald-700' : feedback === 'wrong' ? 'bg-rose-100 text-rose-600' : 'bg-white text-slate-500'
          }`}>
            {showHint && !completed ? `找一找：下一个是数字 ${nextNumber} 👀` : message}
          </div>
        </div>

        <div className="relative rounded-3xl bg-sky-50/80 p-3 md:p-4">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-black text-slate-700 md:text-lg">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-sky-500 text-white">🚂</span>
            数字小火车
          </h2>
          <div className="number-row grid grid-flow-col auto-cols-[4.5rem] gap-2 overflow-x-auto px-0.5 pb-2 md:grid-flow-row md:grid-cols-9 md:auto-cols-auto md:overflow-visible md:pb-0">
            {NUMBERS.map((number) => <EmptySlot key={number} number={number} filled={placed.includes(number)} />)}
          </div>
        </div>

        {completed && (
          <div className="relative mt-6 flex flex-col items-center justify-between gap-4 rounded-3xl bg-emerald-500 p-5 text-center text-white sm:flex-row sm:text-left">
            <div>
              <strong className="block text-xl font-black">闯关成功，获得 3 颗星！ ⭐⭐⭐</strong>
              <span className="text-sm font-semibold text-emerald-50">{mistakes === 0 ? '一次都没有点错，你真细心！' : `练习了 ${mistakes} 次，你坚持完成啦！`}</span>
            </div>
            <button type="button" onClick={restartGame} className="rounded-2xl bg-white px-5 py-3 font-black text-emerald-600 shadow-lg transition hover:-translate-y-0.5 active:scale-95">
              再玩一次
            </button>
          </div>
        )}
      </section>
    </main>
  )
}
