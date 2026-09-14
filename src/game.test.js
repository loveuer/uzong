import { beforeEach, describe, expect, it } from 'vitest'
import { NUMBERS, shuffleNumbers, useNumberGame } from './game'

describe('shuffleNumbers', () => {
  it('保留 1 到 9 且不会返回原始顺序', () => {
    const result = shuffleNumbers(() => 0.999)

    expect([...result].sort((a, b) => a - b)).toEqual(NUMBERS)
    expect(result).not.toEqual(NUMBERS)
  })
})

describe('number game', () => {
  beforeEach(() => {
    useNumberGame.setState({ placed: [], mistakes: 0, feedback: 'ready', selected: null })
  })

  it('只接受当前应放入的数字', () => {
    useNumberGame.getState().choose(3)
    expect(useNumberGame.getState()).toMatchObject({ placed: [], mistakes: 1, feedback: 'wrong' })

    useNumberGame.getState().choose(1)
    expect(useNumberGame.getState()).toMatchObject({ placed: [1], mistakes: 1, feedback: 'correct' })
  })

  it('依次放满九个数字后完成游戏', () => {
    NUMBERS.forEach((number) => useNumberGame.getState().choose(number))

    expect(useNumberGame.getState()).toMatchObject({ placed: NUMBERS, feedback: 'complete' })
  })

  it('重新开始会清空进度和错误次数', () => {
    useNumberGame.getState().choose(8)
    useNumberGame.getState().choose(1)
    useNumberGame.getState().restart()

    expect(useNumberGame.getState()).toMatchObject({ placed: [], mistakes: 0, feedback: 'ready', selected: null })
  })
})
