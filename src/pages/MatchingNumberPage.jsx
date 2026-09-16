import Celebration from '../components/Celebration'
import { numberColors } from '../content'
import { MATCHING_TOTAL_ROUNDS, useMatchingNumberGame } from '../matchingNumberGame'

function NumberCard({ number, matched, selected, wrong, onChoose }) {
  return (
    <button
      type="button"
      disabled={matched}
      onClick={() => onChoose(number)}
      aria-label={matched ? `数字 ${number} 已配对` : `选择数字 ${number}`}
      className={`relative grid h-20 w-full place-items-center rounded-2xl border-2 bg-gradient-to-br text-4xl font-black shadow-sm transition md:h-24 md:rounded-3xl md:text-5xl ${numberColors[number - 1]} ${
        matched ? 'opacity-55' : 'active:scale-95'
      } ${selected ? 'ring-4 ring-sky-300' : ''} ${wrong ? 'animate-wiggle ring-4 ring-rose-300' : ''}`}
    >
      {number}
      {matched && <span className="absolute right-2 top-2 text-base text-emerald-600" aria-hidden="true">✓</span>}
    </button>
  )
}

function QuantityCard({ quantity, matched, selected, wrong, onChoose }) {
  return (
    <button
      type="button"
      disabled={matched}
      onClick={() => onChoose(quantity)}
      aria-label={matched ? `${quantity} 个小芽已配对` : `选择 ${quantity} 个小芽`}
      className={`relative flex h-20 w-full items-center justify-center rounded-2xl border-2 bg-white shadow-sm transition md:h-24 md:rounded-3xl ${
        matched ? 'border-emerald-200 bg-emerald-50 opacity-55' : 'border-white active:scale-95'
      } ${selected ? 'ring-4 ring-sky-300' : ''} ${wrong ? 'animate-wiggle ring-4 ring-rose-300' : ''}`}
    >
      <span className="flex max-w-[4.75rem] flex-wrap justify-center gap-0.5" aria-hidden="true">
        {Array.from({ length: quantity }, (_, index) => <span key={index} className="w-5 text-lg leading-none md:w-6 md:text-2xl">🌱</span>)}
      </span>
      {matched && <span className="absolute right-2 top-2 text-base font-black text-emerald-600" aria-hidden="true">✓</span>}
    </button>
  )
}

export default function MatchingNumberPage() {
  const {
    numbers,
    quantities,
    round,
    matched,
    mistakes,
    selectedNumber,
    selectedQuantity,
    feedback,
    roundComplete,
    finished,
    chooseNumber,
    chooseQuantity,
    nextRound,
    restart,
  } = useMatchingNumberGame()

  const message = finished
    ? '五轮全部完成，数字朋友都找到啦！'
    : roundComplete
      ? '这一轮全部配对成功！'
      : feedback === 'wrong'
        ? '数量不一样，再数一数吧'
        : feedback === 'correct'
          ? '找到朋友啦，继续加油！'
          : selectedNumber !== null
            ? `找一找：哪张卡有 ${selectedNumber} 个小芽？`
            : selectedQuantity !== null
              ? '数一数，再选择左边的数字'
              : '先点一张卡，再找它的好朋友'

  return (
    <main id="main" className="mx-auto flex w-full max-w-6xl flex-1 items-center px-3 pb-3 md:pb-4 lg:px-6">
      <section className="relative w-full overflow-hidden rounded-[2rem] border-4 border-white bg-white/90 p-4 shadow-2xl shadow-emerald-200/60 md:rounded-[2.5rem]">
        {finished && <Celebration />}

        <div className="relative mb-4 flex items-center justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-600">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> 数字小游戏 · 第 3 关
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-800 md:text-4xl">数字找朋友</h1>
            <p className="mt-1 text-sm font-semibold text-slate-500 md:text-base">把数字和相同数量的小芽配成一对</p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="rounded-2xl bg-emerald-50 px-4 py-2 text-center ring-1 ring-emerald-100">
              <span className="block text-[10px] font-bold text-emerald-600">轮次</span>
              <strong className="text-lg text-emerald-700">{round} / {MATCHING_TOTAL_ROUNDS}</strong>
            </div>
            <button type="button" onClick={restart} className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-200 active:scale-95">
              ↻ 重新开始
            </button>
          </div>
        </div>

        <div className="relative grid grid-cols-2 gap-3 md:gap-4">
          <section className="rounded-3xl bg-orange-50/80 p-3 md:p-4" aria-labelledby="number-cards-heading">
            <h2 id="number-cards-heading" className="mb-3 text-center text-sm font-black text-slate-700 md:text-base">数字卡</h2>
            <div className="grid gap-2.5 md:gap-3">
              {numbers.map((number) => (
                <NumberCard
                  key={number}
                  number={number}
                  matched={matched.includes(number)}
                  selected={selectedNumber === number}
                  wrong={feedback === 'wrong' && selectedNumber === number}
                  onChoose={chooseNumber}
                />
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-emerald-50/80 p-3 md:p-4" aria-labelledby="quantity-cards-heading">
            <h2 id="quantity-cards-heading" className="mb-3 text-center text-sm font-black text-slate-700 md:text-base">数量卡</h2>
            <div className="grid gap-2.5 md:gap-3">
              {quantities.map((quantity) => (
                <QuantityCard
                  key={quantity}
                  quantity={quantity}
                  matched={matched.includes(quantity)}
                  selected={selectedQuantity === quantity}
                  wrong={feedback === 'wrong' && selectedQuantity === quantity}
                  onChoose={chooseQuantity}
                />
              ))}
            </div>
          </section>
        </div>

        <div className="relative mt-3 flex min-h-12 flex-wrap items-center justify-center gap-3 text-center" aria-live="polite">
          <p className={`rounded-full px-5 py-2 text-sm font-black md:text-base ${
            feedback === 'wrong' ? 'bg-rose-100 text-rose-700' : roundComplete ? 'bg-emerald-100 text-emerald-700' : 'bg-white text-slate-500'
          }`}>
            {message}
          </p>
          {roundComplete && !finished && (
            <button type="button" onClick={nextRound} className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-black text-white shadow-md shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-600 active:scale-95">
              下一轮 →
            </button>
          )}
          {finished && (
            <button type="button" onClick={restart} className="rounded-xl bg-white px-5 py-2.5 text-sm font-black text-emerald-600 shadow-md ring-1 ring-emerald-100 transition hover:-translate-y-0.5 active:scale-95">
              再玩一轮
            </button>
          )}
        </div>

        <span className="sr-only" aria-live="polite">已配对 {matched.length} 组，错误 {mistakes} 次</span>
      </section>
    </main>
  )
}
