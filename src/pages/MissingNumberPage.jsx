import Celebration from '../components/Celebration'
import { numberColors } from '../content'
import { TOTAL_ROUNDS, useMissingNumberGame } from '../missingNumberGame'

export default function MissingNumberPage() {
  const { missing, options, sequence, mode, round, mistakes, feedback, selected, finished, choose, nextRound, setMode, restart } = useMissingNumberGame()
  const revealed = feedback === 'correct' || feedback === 'complete'
  const message = finished
    ? '全都找到了，你的眼睛真厉害！'
    : feedback === 'wrong'
      ? '这个数字还在队伍里，再找一找吧'
      : feedback === 'correct'
        ? `找到了！不见的是数字 ${missing}`
        : '看看问号的位置，哪个数字不见了？'

  return (
    <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 pb-12 sm:px-8">
      <section className="relative overflow-hidden rounded-[2rem] border-4 border-white bg-white/90 p-5 shadow-2xl shadow-sky-200/60 sm:rounded-[2.5rem] sm:p-8 lg:p-10">
        {finished && <Celebration />}

        <div className="relative mb-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-sky-600">
              <span className="h-2 w-2 rounded-full bg-sky-400" /> 数字小游戏 · 第 2 关
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-800 sm:text-4xl">谁不见了？</h1>
            <p className="mt-2 text-sm font-semibold text-slate-500 sm:text-base">找出 1–9 中藏起来的数字</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-sky-50 px-4 py-2 text-center ring-1 ring-sky-100">
              <span className="block text-[10px] font-bold text-sky-600">题目</span>
              <strong className="text-lg text-sky-700">{round} / {TOTAL_ROUNDS}</strong>
            </div>
            <button type="button" onClick={restart} className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-200 active:scale-95">
              ↻ 重新开始
            </button>
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-3 rounded-3xl bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
          <div className="px-2">
            <strong className="block text-sm font-black text-slate-700">选择难度</strong>
            <span className="text-xs font-semibold text-slate-400">切换难度会重新开始本轮</span>
          </div>
          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-white p-1.5 shadow-sm" role="group" aria-label="难度选择">
            <button
              type="button"
              aria-pressed={mode === 'ordered'}
              disabled={mode === 'ordered'}
              onClick={() => setMode('ordered')}
              className={`rounded-xl px-4 py-2.5 text-sm font-black transition ${mode === 'ordered' ? 'bg-orange-100 text-orange-700' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              😊 基础模式
            </button>
            <button
              type="button"
              aria-pressed={mode === 'shuffled'}
              disabled={mode === 'shuffled'}
              onClick={() => setMode('shuffled')}
              className={`rounded-xl px-4 py-2.5 text-sm font-black transition ${mode === 'shuffled' ? 'bg-sky-100 text-sky-700' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              🚀 挑战模式
            </button>
          </div>
        </div>

        <div className="relative rounded-3xl bg-sky-50/80 p-4 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-sm font-black text-slate-700 sm:text-base">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-sky-200" aria-hidden="true">👀</span>
              仔细看看数字队伍
            </h2>
            <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wider text-sky-700 shadow-sm sm:text-xs">
              {mode === 'shuffled' ? '乱序挑战' : '顺序提示'}
            </span>
          </div>
          <div className="number-row grid grid-flow-col auto-cols-[3.5rem] gap-2 overflow-x-auto px-0.5 pb-2 sm:grid-flow-row sm:grid-cols-9 sm:auto-cols-auto sm:gap-3 sm:overflow-visible sm:pb-0">
            {sequence.map((number, index) => {
              const hidden = number === null && !revealed
              const shownNumber = number === null ? missing : number
              return (
                <div
                  key={index}
                  aria-label={hidden ? '这里缺少一个数字' : `数字 ${shownNumber}`}
                  className={`aspect-square rounded-2xl border-2 bg-gradient-to-br text-2xl font-black shadow-sm sm:rounded-3xl sm:text-3xl ${
                    hidden ? 'animate-soft-pulse grid place-items-center border-dashed border-sky-300 bg-white text-sky-500' : `grid place-items-center ${numberColors[shownNumber - 1]}`
                  }`}
                >
                  {hidden ? '?' : shownNumber}
                </div>
              )
            })}
          </div>
        </div>

        <div className="relative my-5 min-h-12 text-center" aria-live="polite">
          <p className={`inline-flex rounded-full px-5 py-2 text-sm font-black sm:text-base ${
            feedback === 'wrong' ? 'bg-rose-100 text-rose-700' : revealed ? 'bg-emerald-100 text-emerald-700' : 'bg-white text-slate-500'
          }`}>
            {message}
          </p>
        </div>

        {!finished && (
          <div className="relative rounded-3xl bg-amber-50/70 p-5 sm:p-7">
            <h2 className="mb-5 text-center text-sm font-black text-slate-700 sm:text-base">选择不见的数字</h2>
            <div className="mx-auto grid max-w-xl grid-cols-3 gap-3 sm:gap-5">
              {options.map((number) => {
                const isWrong = selected === number && feedback === 'wrong'
                const isCorrect = selected === number && feedback === 'correct'
                return (
                  <button
                    key={number}
                    type="button"
                    disabled={feedback === 'correct'}
                    onClick={() => choose(number)}
                    aria-label={`选择数字 ${number}`}
                    className={`aspect-[4/3] rounded-2xl border-2 text-3xl font-black shadow-md transition sm:rounded-3xl sm:text-4xl ${
                      isWrong
                        ? 'animate-wiggle border-rose-200 bg-rose-100 text-rose-700'
                        : isCorrect
                          ? 'animate-pop border-emerald-200 bg-emerald-100 text-emerald-700'
                          : 'border-white bg-white text-slate-700 hover:-translate-y-1 hover:border-sky-200 hover:bg-sky-50 active:scale-95'
                    }`}
                  >
                    {number}
                  </button>
                )
              })}
            </div>

            {feedback === 'correct' && (
              <button type="button" onClick={nextRound} className="mx-auto mt-6 block rounded-2xl bg-sky-500 px-7 py-3 font-black text-white shadow-lg shadow-sky-200 transition hover:-translate-y-0.5 hover:bg-sky-600 active:scale-95">
                下一题 →
              </button>
            )}
          </div>
        )}

        {finished && (
          <div className="relative mt-6 flex flex-col items-center justify-between gap-4 rounded-3xl bg-emerald-500 p-6 text-center text-white sm:flex-row sm:text-left">
            <div>
              <strong className="block text-xl font-black">五个数字全都找到啦！ ⭐⭐⭐</strong>
              <span className="text-sm font-semibold text-emerald-50">{mistakes === 0 ? '每一题都一次答对，你观察得真仔细！' : `多尝试了 ${mistakes} 次，你一直没有放弃！`}</span>
            </div>
            <button type="button" onClick={restart} className="rounded-2xl bg-white px-5 py-3 font-black text-emerald-600 shadow-lg transition hover:-translate-y-0.5 active:scale-95">
              再玩一轮
            </button>
          </div>
        )}
      </section>
    </main>
  )
}
