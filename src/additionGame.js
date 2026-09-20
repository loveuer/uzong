import { create } from 'zustand'
import { NUMBERS } from './game'

export const ADDITION_TOTAL_ROUNDS = 5
export const ADDITION_FRUITS = [
  { emoji: '🍎', name: '苹果' },
  { emoji: '🍌', name: '香蕉' },
  { emoji: '🍊', name: '橘子' },
  { emoji: '🍓', name: '草莓' },
  { emoji: '🍇', name: '葡萄' },
]

function shuffle(list, random) {
  const result = [...list]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1))
    ;[result[index], result[target]] = [result[target], result[index]]
  }
  return result
}

export function buildAdditionRound(random = Math.random) {
  const fruit = ADDITION_FRUITS[Math.floor(random() * ADDITION_FRUITS.length)]
  const left = 1 + Math.floor(random() * 5)
  const maxRight = Math.min(5, 9 - left)
  const right = 1 + Math.floor(random() * maxRight)
  const answer = left + right
  const nearbyAnswers = [answer - 1, answer + 1, answer - 2, answer + 2]
    .filter((number) => NUMBERS.includes(number))

  return {
    fruit,
    left,
    right,
    answer,
    options: shuffle([answer, ...shuffle(nearbyAnswers, random).slice(0, 2)], random),
  }
}

function initialState() {
  return {
    ...buildAdditionRound(),
    round: 1,
    solved: 0,
    mistakes: 0,
    feedback: 'ready',
    selected: null,
    finished: false,
  }
}

export const useAdditionGame = create((set, get) => ({
  ...initialState(),

  choose(number) {
    const state = get()
    if (state.finished || state.feedback === 'correct' || !state.options.includes(number)) return

    if (number !== state.answer) {
      set({
        mistakes: state.mistakes + 1,
        feedback: 'wrong',
        selected: number,
      })
      return
    }

    const finished = state.round === ADDITION_TOTAL_ROUNDS
    set({
      solved: state.solved + 1,
      feedback: finished ? 'complete' : 'correct',
      selected: number,
      finished,
    })
  },

  nextRound() {
    const state = get()
    if (state.feedback !== 'correct') return

    set({
      ...buildAdditionRound(),
      round: state.round + 1,
      feedback: 'ready',
      selected: null,
    })
  },

  restart() {
    set(initialState())
  },
}))
