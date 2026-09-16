import { beforeEach, describe, expect, it } from 'vitest'
import {
  buildMatchingRound,
  MATCHES_PER_ROUND,
  MATCHING_TOTAL_ROUNDS,
  useMatchingNumberGame,
} from './matchingNumberGame'

describe('buildMatchingRound', () => {
  it('生成三组不重复且两侧一致的数字', () => {
    const round = buildMatchingRound(() => 0)

    expect(round.numbers).toHaveLength(MATCHES_PER_ROUND)
    expect(new Set(round.numbers).size).toBe(MATCHES_PER_ROUND)
    expect([...round.quantities].sort((a, b) => a - b)).toEqual([...round.numbers].sort((a, b) => a - b))
    expect(round.numbers.every((number) => number >= 1 && number <= 9)).toBe(true)
  })
})

describe('matching number game', () => {
  beforeEach(() => useMatchingNumberGame.getState().restart())

  it('错误配对保留本轮，正确配对才计入进度', () => {
    const state = useMatchingNumberGame.getState()
    const number = state.numbers[0]
    const wrongQuantity = state.quantities.find((quantity) => quantity !== number)

    state.chooseNumber(number)
    useMatchingNumberGame.getState().chooseQuantity(wrongQuantity)
    expect(useMatchingNumberGame.getState()).toMatchObject({ matched: [], mistakes: 1, feedback: 'wrong' })

    useMatchingNumberGame.getState().chooseQuantity(number)
    expect(useMatchingNumberGame.getState()).toMatchObject({ matched: [number], feedback: 'correct', selectedNumber: null, selectedQuantity: null })
  })

  it('配完三组后才可以进入下一轮', () => {
    const numbers = useMatchingNumberGame.getState().numbers
    numbers.forEach((number) => {
      useMatchingNumberGame.getState().chooseNumber(number)
      useMatchingNumberGame.getState().chooseQuantity(number)
    })

    expect(useMatchingNumberGame.getState()).toMatchObject({ round: 1, roundComplete: true, feedback: 'round-complete' })

    useMatchingNumberGame.getState().nextRound()
    expect(useMatchingNumberGame.getState()).toMatchObject({ round: 2, matched: [], roundComplete: false, feedback: 'ready' })
  })

  it('完成五轮后通关', () => {
    for (let round = 1; round <= MATCHING_TOTAL_ROUNDS; round += 1) {
      const numbers = useMatchingNumberGame.getState().numbers
      numbers.forEach((number) => {
        useMatchingNumberGame.getState().chooseNumber(number)
        useMatchingNumberGame.getState().chooseQuantity(number)
      })
      if (round < MATCHING_TOTAL_ROUNDS) useMatchingNumberGame.getState().nextRound()
    }

    expect(useMatchingNumberGame.getState()).toMatchObject({ round: MATCHING_TOTAL_ROUNDS, finished: true, feedback: 'complete' })
  })

  it('重新开始会清空进度和错误次数', () => {
    const state = useMatchingNumberGame.getState()
    const wrongQuantity = state.quantities.find((quantity) => quantity !== state.numbers[0])
    state.chooseNumber(state.numbers[0])
    useMatchingNumberGame.getState().chooseQuantity(wrongQuantity)

    useMatchingNumberGame.getState().restart()

    expect(useMatchingNumberGame.getState()).toMatchObject({ round: 1, matched: [], mistakes: 0, feedback: 'ready', finished: false })
  })
})
