import { create } from 'zustand'
import { NUMBERS } from './game'

export const TOTAL_ROUNDS = 5

function shuffle(list, random) {
  const result = [...list]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1))
    ;[result[index], result[target]] = [result[target], result[index]]
  }
  return result
}

export function buildMissingNumberRound(mode = 'ordered', random = Math.random) {
  const missing = NUMBERS[Math.floor(random() * NUMBERS.length)]
  const distractors = shuffle(
    NUMBERS.filter((number) => number !== missing),
    random,
  ).slice(0, 2)
  const remaining = NUMBERS.filter((number) => number !== missing)
  const sequence = mode === 'shuffled'
    ? shuffle([...remaining, null], random)
    : NUMBERS.map((number) => (number === missing ? null : number))

  return {
    missing,
    options: shuffle([missing, ...distractors], random),
    sequence,
  }
}

export const useMissingNumberGame = create((set, get) => ({
  ...buildMissingNumberRound('ordered'),
  mode: 'ordered',
  round: 1,
  solved: 0,
  mistakes: 0,
  feedback: 'ready',
  selected: null,
  finished: false,

  choose(number) {
    const state = get()
    if (state.finished || state.feedback === 'correct') return

    if (number !== state.missing) {
      set({
        mistakes: state.mistakes + 1,
        feedback: 'wrong',
        selected: number,
      })
      return
    }

    const finished = state.round === TOTAL_ROUNDS
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
      ...buildMissingNumberRound(state.mode),
      round: state.round + 1,
      feedback: 'ready',
      selected: null,
    })
  },

  setMode(mode) {
    if (mode !== 'ordered' && mode !== 'shuffled') return

    set({
      ...buildMissingNumberRound(mode),
      mode,
      round: 1,
      solved: 0,
      mistakes: 0,
      feedback: 'ready',
      selected: null,
      finished: false,
    })
  },

  restart() {
    const { mode } = get()
    set({
      ...buildMissingNumberRound(mode),
      round: 1,
      solved: 0,
      mistakes: 0,
      feedback: 'ready',
      selected: null,
      finished: false,
    })
  },
}))
