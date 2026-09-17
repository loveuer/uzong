import { create } from 'zustand'
import { NUMBERS } from './game'

export const MATCHES_PER_ROUND = 3
export const MATCHING_TOTAL_ROUNDS = 5

function shuffle(list, random) {
  const result = [...list]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1))
    ;[result[index], result[target]] = [result[target], result[index]]
  }
  return result
}

export function buildMatchingRound(random = Math.random) {
  const values = shuffle(NUMBERS, random).slice(0, MATCHES_PER_ROUND)
  return {
    numbers: shuffle(values, random),
    quantities: shuffle(values, random),
  }
}

export const useMatchingNumberGame = create((set, get) => {
  const checkPair = (number, quantity) => {
    const state = get()

    if (number !== quantity) {
      set({ selectedNumber: number, selectedQuantity: quantity, mistakes: state.mistakes + 1, feedback: 'wrong' })
      return
    }

    const matched = [...state.matched, number]
    const roundComplete = matched.length === MATCHES_PER_ROUND
    const finished = roundComplete && state.round === MATCHING_TOTAL_ROUNDS
    set({
      matched,
      selectedNumber: null,
      selectedQuantity: null,
      roundComplete,
      finished,
      feedback: finished ? 'complete' : roundComplete ? 'round-complete' : 'correct',
    })
  }

  return {
    ...buildMatchingRound(),
    round: 1,
    matched: [],
    mistakes: 0,
    selectedNumber: null,
    selectedQuantity: null,
    feedback: 'ready',
    roundComplete: false,
    finished: false,

    chooseNumber(number) {
      const state = get()
      if (state.finished || state.roundComplete || state.matched.includes(number) || !state.numbers.includes(number)) return

      if (state.selectedQuantity !== null) {
        checkPair(number, state.selectedQuantity)
        return
      }

      set({ selectedNumber: number, feedback: 'selected' })
    },

    chooseQuantity(quantity) {
      const state = get()
      if (state.finished || state.roundComplete || state.matched.includes(quantity) || !state.quantities.includes(quantity)) return

      if (state.selectedNumber !== null) {
        checkPair(state.selectedNumber, quantity)
        return
      }

      set({ selectedQuantity: quantity, feedback: 'selected' })
    },

    connectPair(number, quantity) {
      const state = get()
      if (
        state.finished
        || state.roundComplete
        || state.matched.includes(number)
        || state.matched.includes(quantity)
        || !state.numbers.includes(number)
        || !state.quantities.includes(quantity)
      ) return

      checkPair(number, quantity)
    },

    nextRound() {
      const state = get()
      if (!state.roundComplete || state.finished) return

      set({
        ...buildMatchingRound(),
        round: state.round + 1,
        matched: [],
        selectedNumber: null,
        selectedQuantity: null,
        feedback: 'ready',
        roundComplete: false,
      })
    },

    restart() {
      set({
        ...buildMatchingRound(),
        round: 1,
        matched: [],
        mistakes: 0,
        selectedNumber: null,
        selectedQuantity: null,
        feedback: 'ready',
        roundComplete: false,
        finished: false,
      })
    },
  }
})
