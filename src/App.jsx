import { useEffect, useState } from 'react'
import { NUMBERS, useNumberGame } from './game'
import { TOTAL_ROUNDS, useMissingNumberGame } from './missingNumberGame'

const categories = [
  {
    id: 'numbers',
    name: '数字乐园',
    icon: '123',
    description: '认识数字，发现排列与计算的乐趣',
    card: 'from-orange-100 to-amber-50 border-orange-200 hover:shadow-orange-200',
    iconColor: 'from-orange-400 to-amber-500 shadow-orange-200',
    active: true,
  },
  {
    id: 'letters',
    name: '字母天地',
    icon: 'ABC',
    description: '认识字母，听见不一样的声音',
    card: 'from-sky-100 to-cyan-50 border-sky-200 hover:shadow-sky-200',
    iconColor: 'from-sky-400 to-cyan-500 shadow-sky-200',
  },
  {
    id: 'words',
    name: '单词森林',
    icon: 'Aa',
    description: '认识单词，用语言探索新世界',
    card: 'from-emerald-100 to-lime-50 border-emerald-200 hover:shadow-emerald-200',
    iconColor: 'from-emerald-400 to-lime-500 shadow-emerald-200',
  },
]

const numberColors = [
  'from-rose-100 to-rose-200 border-rose-200 text-rose-700 shadow-rose-100',
  'from-orange-100 to-orange-200 border-orange-200 text-orange-700 shadow-orange-100',
  'from-amber-100 to-amber-200 border-amber-200 text-amber-700 shadow-amber-100',
  'from-lime-100 to-lime-200 border-lime-200 text-lime-700 shadow-lime-100',
  'from-emerald-100 to-emerald-200 border-emerald-200 text-emerald-700 shadow-emerald-100',
  'from-cyan-100 to-cyan-200 border-cyan-200 text-cyan-700 shadow-cyan-100',
  'from-sky-100 to-sky-200 border-sky-200 text-sky-700 shadow-sky-100',
  'from-violet-100 to-violet-200 border-violet-200 text-violet-700 shadow-violet-100',
  'from-fuchsia-100 to-fuchsia-200 border-fuchsia-200 text-fuchsia-700 shadow-fuchsia-100',
]

function Header({ onHome, onBack, backLabel }) {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
      <button type="button" onClick={onHome} className="group flex items-center gap-3 text-left" aria-label="返回粽粽学习乐园首页">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fff3cf] shadow-md shadow-emerald-100 transition group-hover:-rotate-3 group-hover:scale-105">
          <img src="/brand/zongzong-logo.svg" alt="" className="h-12 w-12" />
        </span>
        <span>
          <strong className="block text-lg leading-none tracking-wide text-slate-800">粽粽学习乐园</strong>
          <small className="mt-1 block text-[11px] font-bold tracking-[0.18em] text-emerald-600">边玩边学 · 快乐成长</small>
        </span>
      </button>
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="rounded-2xl bg-white/90 px-4 py-2.5 text-sm font-black text-slate-600 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md active:scale-95"
        >
          ← {backLabel}
        </button>
      ) : (
        <div className="hidden items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-amber-600 shadow-sm ring-1 ring-amber-100 sm:flex">
          <span aria-hidden="true">⭐</span> 今天也要加油呀！
        </div>
      )}
    </header>
  )
}

function HomePage({ onSelect }) {
  return (
    <main id="main" className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pb-16 pt-6 sm:px-8 sm:pt-12">
      <section className="mb-10 text-center sm:mb-14">
        <span className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-xs font-black tracking-wider text-emerald-600 shadow-sm ring-1 ring-emerald-100">
          🌈 今天想探索什么？
        </span>
        <h1 className="text-4xl font-black tracking-tight text-slate-800 sm:text-6xl">选择你的学习乐园</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm font-semibold leading-7 text-slate-500 sm:text-lg">
          每一次点击，都是一次快乐成长
        </p>
      </section>

      <nav aria-label="学习分类" className="grid gap-5 md:grid-cols-3">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(category.id)}
            className={`group relative min-h-64 overflow-hidden rounded-[2rem] border-2 bg-gradient-to-br p-7 text-left shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl active:scale-[0.98] ${category.card}`}
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
          </button>
        ))}
      </nav>
    </main>
  )
}

function NumberGames({ onSelect }) {
  const games = [
    {
      id: 'number-sort',
      icon: '🚂',
      name: '数字排排队',
      description: '从 1 到 9，帮数字小火车排好队',
      card: 'from-orange-100 to-amber-50 border-orange-200 hover:shadow-orange-200',
      iconColor: 'bg-orange-200',
    },
    {
      id: 'missing-number',
      icon: '🔍',
      name: '谁不见了？',
      description: '仔细观察，找出 1–9 中缺少的数字',
      card: 'from-sky-100 to-cyan-50 border-sky-200 hover:shadow-sky-200',
      iconColor: 'bg-sky-200',
    },
  ]

  return (
    <main id="main" className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-5 pb-16 pt-6 sm:px-8 sm:pt-10">
      <section className="mb-9 text-center sm:mb-12">
        <span className="mb-4 inline-flex rounded-full bg-orange-100 px-4 py-2 text-xs font-black tracking-wider text-orange-700">123 · 数字乐园</span>
        <h1 className="text-4xl font-black tracking-tight text-slate-800 sm:text-5xl">今天玩哪个？</h1>
        <p className="mt-3 font-semibold text-slate-500">选一个小游戏，和数字交朋友</p>
      </section>

      <nav aria-label="数字小游戏" className="grid gap-5 sm:grid-cols-2 sm:gap-7">
        {games.map((game, index) => (
          <button
            key={game.id}
            type="button"
            onClick={() => onSelect(game.id)}
            className={`group relative min-h-64 overflow-hidden rounded-[2rem] border-2 bg-gradient-to-br p-7 text-left shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl active:scale-[0.98] sm:min-h-80 sm:p-9 ${game.card}`}
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
          </button>
        ))}
      </nav>
    </main>
  )
}

function ComingSoon({ category }) {
  return (
    <main id="main" className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-5 pb-16 sm:px-8">
      <section className={`w-full max-w-2xl rounded-[2.5rem] border-4 border-white bg-gradient-to-br p-8 text-center shadow-2xl sm:p-14 ${category.card}`}>
        <span className={`mx-auto grid h-28 w-28 place-items-center rounded-[2rem] bg-gradient-to-br text-3xl font-black text-white shadow-xl ${category.iconColor}`}>
          {category.icon}
        </span>
        <h1 className="mt-7 text-3xl font-black text-slate-800 sm:text-5xl">{category.name}</h1>
        <p className="mx-auto mt-4 max-w-md font-semibold leading-7 text-slate-500">这里正在播种新的小游戏，很快就能来探索啦！</p>
        <div className="mt-8 inline-flex rounded-full bg-white/80 px-5 py-2 text-sm font-black text-slate-600 shadow-sm">🎁 敬请期待</div>
      </section>
    </main>
  )
}

function NumberTile({ number, placed, selected, feedback, onChoose }) {
  const wrong = selected === number && feedback === 'wrong'

  return (
    <button
      type="button"
      disabled={placed}
      aria-label={placed ? `数字 ${number} 已放好` : `选择数字 ${number}`}
      onClick={() => onChoose(number)}
      className={`number-tile aspect-square rounded-2xl border-2 bg-gradient-to-br text-2xl font-black shadow-md transition-all sm:rounded-3xl sm:text-3xl ${numberColors[number - 1]} ${
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
      className={`slot aspect-square min-w-0 rounded-2xl border-2 sm:rounded-3xl ${
        filled
          ? `animate-pop bg-gradient-to-br shadow-md ${numberColors[number - 1]}`
          : 'border-dashed border-slate-200 bg-slate-50/80 text-slate-300'
      } grid place-items-center text-2xl font-black sm:text-3xl`}
    >
      {filled ? number : <span className="text-base sm:text-lg">?</span>}
    </div>
  )
}

function Celebration() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.5rem]" aria-hidden="true">
      {['🎉', '⭐', '✨', '🎊', '🌟', '💫'].map((piece, index) => (
        <span key={piece} className="confetti" style={{ '--delay': `${index * 0.12}s`, '--left': `${10 + index * 16}%` }}>
          {piece}
        </span>
      ))}
    </div>
  )
}

function GameBoard() {
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
    <main id="main" className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-8">
      <section className="relative overflow-hidden rounded-[2rem] border-4 border-white bg-white/90 p-5 shadow-2xl shadow-orange-200/60 sm:rounded-[2.5rem] sm:p-8 lg:p-10">
        {completed && <Celebration />}

        <div className="relative mb-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-orange-500">
              <span className="h-2 w-2 rounded-full bg-orange-400" /> 数字小游戏 · 第 1 关
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-800 sm:text-4xl">数字排排队</h1>
            <p className="mt-2 text-sm font-semibold text-slate-500 sm:text-base">帮数字小火车从 1 到 9 排好队吧！</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-amber-50 px-4 py-2 text-center ring-1 ring-amber-100">
              <span className="block text-[10px] font-bold text-amber-600">进度</span>
              <strong className="text-lg text-amber-600">{placed.length} / 9</strong>
            </div>
            <button
              type="button"
              onClick={restartGame}
              className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-200 active:scale-95"
            >
              ↻ 重新开始
            </button>
          </div>
        </div>

        <div className="relative rounded-3xl bg-orange-50/80 p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-sm font-black text-slate-700 sm:text-base">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-orange-500 text-white">☝</span>
              点击这里的数字
            </h2>
            {!completed && (
              <button
                type="button"
                onClick={() => setShowHint(true)}
                className="rounded-full bg-white px-3 py-1.5 text-xs font-black text-orange-500 shadow-sm transition hover:-translate-y-0.5"
              >
                💡 给我提示
              </button>
            )}
          </div>

          <div className="number-row grid grid-flow-col auto-cols-[3.5rem] gap-2 overflow-x-auto px-0.5 pb-2 sm:grid-flow-row sm:grid-cols-9 sm:auto-cols-auto sm:gap-3 sm:overflow-visible sm:pb-0">
            {shuffled.map((number) => (
              <NumberTile
                key={number}
                number={number}
                placed={placed.includes(number)}
                selected={selected}
                feedback={feedback}
                onChoose={choose}
              />
            ))}
          </div>
        </div>

        <div className="relative my-4 flex min-h-12 items-center justify-center" aria-live="polite">
          <div
            className={`rounded-full px-5 py-2 text-center text-sm font-black transition-all sm:text-base ${
              completed
                ? 'bg-emerald-100 text-emerald-700'
                : feedback === 'wrong'
                  ? 'bg-rose-100 text-rose-600'
                  : 'bg-white text-slate-500'
            }`}
          >
            {showHint && !completed ? `找一找：下一个是数字 ${nextNumber} 👀` : message}
          </div>
        </div>

        <div className="relative rounded-3xl bg-sky-50/80 p-4 sm:p-6">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-black text-slate-700 sm:text-base">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-sky-500 text-white">🚂</span>
            数字小火车
          </h2>
          <div className="number-row grid grid-flow-col auto-cols-[3.5rem] gap-2 overflow-x-auto px-0.5 pb-2 sm:grid-flow-row sm:grid-cols-9 sm:auto-cols-auto sm:gap-3 sm:overflow-visible sm:pb-0">
            {NUMBERS.map((number) => (
              <EmptySlot key={number} number={number} filled={placed.includes(number)} />
            ))}
          </div>
        </div>

        {completed && (
          <div className="relative mt-6 flex flex-col items-center justify-between gap-4 rounded-3xl bg-emerald-500 p-5 text-center text-white sm:flex-row sm:text-left">
            <div>
              <strong className="block text-xl font-black">闯关成功，获得 3 颗星！ ⭐⭐⭐</strong>
              <span className="text-sm font-semibold text-emerald-50">{mistakes === 0 ? '一次都没有点错，你真细心！' : `练习了 ${mistakes} 次，你坚持完成啦！`}</span>
            </div>
            <button
              type="button"
              onClick={restartGame}
              className="rounded-2xl bg-white px-5 py-3 font-black text-emerald-600 shadow-lg transition hover:-translate-y-0.5 active:scale-95"
            >
              再玩一次
            </button>
          </div>
        )}
      </section>
    </main>
  )
}

function MissingNumberGame() {
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
            <button
              type="button"
              onClick={restart}
              className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-200 active:scale-95"
            >
              ↻ 重新开始
            </button>
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-3 rounded-3xl bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
          <div className="px-2">
            <strong className="block text-sm font-black text-slate-700">选择难度</strong>
            <span className="text-xs font-semibold text-slate-400">切换难度会重新开始本轮</span>
          </div>
          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-white p-1.5 shadow-sm" aria-label="难度选择">
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
                    hidden
                      ? 'animate-soft-pulse grid place-items-center border-dashed border-sky-300 bg-white text-sky-500'
                      : `grid place-items-center ${numberColors[shownNumber - 1]}`
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
            feedback === 'wrong'
              ? 'bg-rose-100 text-rose-700'
              : revealed
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-white text-slate-500'
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
              <button
                type="button"
                onClick={nextRound}
                className="mx-auto mt-6 block rounded-2xl bg-sky-500 px-7 py-3 font-black text-white shadow-lg shadow-sky-200 transition hover:-translate-y-0.5 hover:bg-sky-600 active:scale-95"
              >
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
            <button
              type="button"
              onClick={restart}
              className="rounded-2xl bg-white px-5 py-3 font-black text-emerald-600 shadow-lg transition hover:-translate-y-0.5 active:scale-95"
            >
              再玩一轮
            </button>
          </div>
        )}
      </section>
    </main>
  )
}

export default function App() {
  const [view, setView] = useState('home')
  const currentCategory = categories.find((category) => category.id === view)
  const insideNumberGame = view === 'number-sort' || view === 'missing-number'

  let content
  if (view === 'home') content = <HomePage onSelect={setView} />
  else if (view === 'numbers') content = <NumberGames onSelect={setView} />
  else if (view === 'number-sort') content = <GameBoard />
  else if (view === 'missing-number') content = <MissingNumberGame />
  else content = <ComingSoon category={currentCategory} />

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-[#fff9ed]">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <Header
        onHome={() => setView('home')}
        onBack={view === 'home' ? undefined : () => setView(insideNumberGame ? 'numbers' : 'home')}
        backLabel={insideNumberGame ? '数字乐园' : '返回首页'}
      />
      {content}
      <footer className="pb-8 text-center text-xs font-semibold text-slate-400">边玩边学 · 粽粽学习乐园</footer>
    </div>
  )
}
