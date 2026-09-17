import { useEffect, useRef, useState } from 'react'
import Celebration from '../components/Celebration'
import { numberColors } from '../content'
import { MATCHING_TOTAL_ROUNDS, useMatchingNumberGame } from '../matchingNumberGame'

const quantityObjects = [
  { icon: '🍎', name: '苹果' },
  { icon: '🍌', name: '香蕉' },
  { icon: '🚗', name: '小汽车' },
]

const connectionColors = ['#fb7185', '#fb923c', '#f59e0b', '#84cc16', '#10b981', '#06b6d4', '#0ea5e9', '#8b5cf6', '#d946ef']

function connectionPath(start, end) {
  const middleX = (start.x + end.x) / 2
  return `M ${start.x} ${start.y} C ${middleX} ${start.y}, ${middleX} ${end.y}, ${end.x} ${end.y}`
}

function NumberCard({ number, matched, selected, wrong, onChoose, cardRef, dragHandlers }) {
  return (
    <button
      ref={cardRef}
      type="button"
      disabled={matched}
      onClick={() => onChoose(number)}
      data-match-side="number"
      data-match-value={number}
      aria-label={matched ? `数字 ${number} 已配对` : `选择数字 ${number}`}
      className={`relative grid h-20 w-full touch-none place-items-center rounded-2xl border-2 bg-gradient-to-br text-4xl font-black shadow-sm transition md:h-24 md:rounded-3xl md:text-5xl ${numberColors[number - 1]} ${
        matched ? 'opacity-55' : 'active:scale-95'
      } ${selected ? 'ring-4 ring-sky-300' : ''} ${wrong ? 'animate-wiggle ring-4 ring-rose-300' : ''}`}
      {...dragHandlers('number', number)}
    >
      {number}
      <span className="absolute right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white shadow ring-2 ring-sky-300" aria-hidden="true" />
      {matched && <span className="absolute right-2 top-2 text-base text-emerald-600" aria-hidden="true">✓</span>}
    </button>
  )
}

function QuantityCard({ quantity, object, matched, selected, wrong, onChoose, cardRef, dragHandlers }) {
  return (
    <button
      ref={cardRef}
      type="button"
      disabled={matched}
      onClick={() => onChoose(quantity)}
      data-match-side="quantity"
      data-match-value={quantity}
      aria-label={matched ? `${quantity} 个${object.name}已配对` : `选择 ${quantity} 个${object.name}`}
      className={`relative flex h-20 w-full touch-none items-center justify-center rounded-2xl border-2 bg-white shadow-sm transition md:h-24 md:rounded-3xl ${
        matched ? 'border-emerald-200 bg-emerald-50 opacity-55' : 'border-white active:scale-95'
      } ${selected ? 'ring-4 ring-sky-300' : ''} ${wrong ? 'animate-wiggle ring-4 ring-rose-300' : ''}`}
      {...dragHandlers('quantity', quantity)}
    >
      <span className="flex max-w-[6.25rem] flex-wrap justify-center gap-0.5" aria-hidden="true">
        {Array.from({ length: quantity }, (_, index) => <span key={index} className="w-7 text-2xl leading-none md:w-8 md:text-3xl">{object.icon}</span>)}
      </span>
      <span className="absolute left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white shadow ring-2 ring-sky-300" aria-hidden="true" />
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
    connectPair,
    nextRound,
    restart,
  } = useMatchingNumberGame()
  const boardRef = useRef(null)
  const cardRefs = useRef({ number: new Map(), quantity: new Map() })
  const dragRef = useRef(null)
  const suppressClickRef = useRef(false)
  const [anchors, setAnchors] = useState({ width: 1, height: 1, number: {}, quantity: {} })
  const [dragLine, setDragLine] = useState(null)

  useEffect(() => {
    const board = boardRef.current
    if (!board) return undefined

    const updateAnchors = () => {
      const boardRect = board.getBoundingClientRect()
      const nextAnchors = { width: boardRect.width, height: boardRect.height, number: {}, quantity: {} }

      cardRefs.current.number.forEach((card, value) => {
        const rect = card.getBoundingClientRect()
        nextAnchors.number[value] = { x: rect.right - boardRect.left - 8, y: rect.top - boardRect.top + rect.height / 2 }
      })
      cardRefs.current.quantity.forEach((card, value) => {
        const rect = card.getBoundingClientRect()
        nextAnchors.quantity[value] = { x: rect.left - boardRect.left + 8, y: rect.top - boardRect.top + rect.height / 2 }
      })

      setAnchors(nextAnchors)
    }

    updateAnchors()
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateAnchors)
    observer?.observe(board)
    window.addEventListener('resize', updateAnchors)
    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', updateAnchors)
    }
  }, [numbers, quantities])

  const registerCard = (side, value) => (card) => {
    if (card) cardRefs.current[side].set(value, card)
    else cardRefs.current[side].delete(value)
  }

  const pointInBoard = (clientX, clientY) => {
    const rect = boardRef.current.getBoundingClientRect()
    return { x: clientX - rect.left, y: clientY - rect.top }
  }

  const startDrag = (event, side, value) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    const cardRect = event.currentTarget.getBoundingClientRect()
    const boardRect = boardRef.current.getBoundingClientRect()
    const start = {
      x: side === 'number' ? cardRect.right - boardRect.left - 8 : cardRect.left - boardRect.left + 8,
      y: cardRect.top - boardRect.top + cardRect.height / 2,
    }
    const nextDrag = { pointerId: event.pointerId, side, value, start, current: start, moved: false }
    dragRef.current = nextDrag
    setDragLine(nextDrag)
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const moveDrag = (event) => {
    const currentDrag = dragRef.current
    if (!currentDrag || currentDrag.pointerId !== event.pointerId) return
    const current = pointInBoard(event.clientX, event.clientY)
    const moved = currentDrag.moved || Math.hypot(current.x - currentDrag.start.x, current.y - currentDrag.start.y) > 8
    const nextDrag = { ...currentDrag, current, moved }
    dragRef.current = nextDrag
    setDragLine(nextDrag)
    if (moved) event.preventDefault()
  }

  const finishDrag = (event) => {
    const currentDrag = dragRef.current
    if (!currentDrag || currentDrag.pointerId !== event.pointerId) return

    if (currentDrag.moved) {
      const target = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-match-side]')
      const targetSide = target?.dataset.matchSide
      const targetValue = Number(target?.dataset.matchValue)
      if (target && !target.disabled && targetSide !== currentDrag.side) {
        const number = currentDrag.side === 'number' ? currentDrag.value : targetValue
        const quantity = currentDrag.side === 'quantity' ? currentDrag.value : targetValue
        connectPair(number, quantity)
      }
      suppressClickRef.current = true
      window.setTimeout(() => { suppressClickRef.current = false }, 0)
      event.preventDefault()
    }

    dragRef.current = null
    setDragLine(null)
  }

  const cancelDrag = () => {
    dragRef.current = null
    setDragLine(null)
  }

  const dragHandlers = (side, value) => ({
    onPointerDown: (event) => startDrag(event, side, value),
    onPointerMove: moveDrag,
    onPointerUp: finishDrag,
    onPointerCancel: cancelDrag,
  })

  const chooseCard = (side, value) => {
    if (suppressClickRef.current) return
    if (side === 'number') chooseNumber(value)
    else chooseQuantity(value)
  }

  const message = finished
    ? '五轮全部完成，数字朋友都找到啦！'
    : roundComplete
      ? '这一轮全部配对成功！'
      : feedback === 'wrong'
        ? '数量不一样，再数一数吧'
        : feedback === 'correct'
          ? '找到朋友啦，继续加油！'
          : selectedNumber !== null
            ? `找一找：哪张卡有 ${selectedNumber} 个物品？`
            : selectedQuantity !== null
              ? '数一数，再选择左边的数字'
              : '按住卡片拖动连线，也可以依次点两张卡'

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
            <p className="mt-1 text-sm font-semibold text-slate-500 md:text-base">把数字和相同数量的物品配成一对</p>
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

        <div ref={boardRef} className="relative grid grid-cols-2 gap-8 md:gap-20">
          <svg
            className="pointer-events-none absolute inset-0 z-30 h-full w-full overflow-visible"
            viewBox={`0 0 ${anchors.width} ${anchors.height}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {matched.map((number) => {
              const start = anchors.number[number]
              const end = anchors.quantity[number]
              if (!start || !end) return null
              return (
                <g key={number}>
                  <path d={connectionPath(start, end)} fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                  <path d={connectionPath(start, end)} fill="none" stroke={connectionColors[number - 1]} strokeWidth="6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                  <circle cx={start.x} cy={start.y} r="6" fill={connectionColors[number - 1]} />
                  <circle cx={end.x} cy={end.y} r="6" fill={connectionColors[number - 1]} />
                </g>
              )
            })}
            {feedback === 'wrong' && anchors.number[selectedNumber] && anchors.quantity[selectedQuantity] && (
              <path d={connectionPath(anchors.number[selectedNumber], anchors.quantity[selectedQuantity])} fill="none" stroke="#fb7185" strokeWidth="5" strokeDasharray="8 7" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            )}
            {dragLine && (
              <path d={connectionPath(dragLine.start, dragLine.current)} fill="none" stroke="#38bdf8" strokeWidth="5" strokeDasharray="9 7" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            )}
          </svg>

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
                  onChoose={(value) => chooseCard('number', value)}
                  cardRef={registerCard('number', number)}
                  dragHandlers={dragHandlers}
                />
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-emerald-50/80 p-3 md:p-4" aria-labelledby="quantity-cards-heading">
            <h2 id="quantity-cards-heading" className="mb-3 text-center text-sm font-black text-slate-700 md:text-base">数量卡</h2>
            <div className="grid gap-2.5 md:gap-3">
              {quantities.map((quantity, index) => (
                <QuantityCard
                  key={quantity}
                  quantity={quantity}
                  object={quantityObjects[index]}
                  matched={matched.includes(quantity)}
                  selected={selectedQuantity === quantity}
                  wrong={feedback === 'wrong' && selectedQuantity === quantity}
                  onChoose={(value) => chooseCard('quantity', value)}
                  cardRef={registerCard('quantity', quantity)}
                  dragHandlers={dragHandlers}
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
