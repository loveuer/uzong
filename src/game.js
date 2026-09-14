import { create } from 'zustand'

export const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export function shuffleNumbers(random = Math.random) {
  const numbers = [...NUMBERS]

  for (let index = numbers.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1))
    ;[numbers[index], numbers[target]] = [numbers[target], numbers[index]]
  }

  if (numbers.every((number, index) => number === NUMBERS[index])) {
    numbers.push(numbers.shift())
  }

  return numbers
}

export const useNumberGame = create((set, get) => ({
  shuffled: shuffleNumbers(),
  placed: [],
  mistakes: 0,
  feedback: 'ready',
  selected: null,

  choose(number) {
    const { placed } = get()
    if (placed.length === NUMBERS.length) return

    const expected = placed.length + 1
    if (number !== expected) {
      set((state) => ({
        mistakes: state.mistakes + 1,
        feedback: 'wrong',
        selected: number,
      }))
      return
    }

    set({
      placed: [...placed, number],
      feedback: number === NUMBERS.length ? 'complete' : 'correct',
      selected: number,
    })
  },

  restart() {
    set({
      shuffled: shuffleNumbers(),
      placed: [],
      mistakes: 0,
      feedback: 'ready',
      selected: null,
    })
  },
}))
