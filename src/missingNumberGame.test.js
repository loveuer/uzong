import { beforeEach, describe, expect, it } from 'vitest'
import { NUMBERS } from './game'
import { buildMissingNumberRound, TOTAL_ROUNDS, useMissingNumberGame } from './missingNumberGame'

describe('buildMissingNumberRound', () => {
  it('生成一个缺失数字和三个不重复选项', () => {
    const round = buildMissingNumberRound('ordered', () => 0)

    expect(NUMBERS).toContain(round.missing)
    expect(round.options).toHaveLength(3)
    expect(new Set(round.options).size).toBe(3)
    expect(round.options).toContain(round.missing)
    expect(round.sequence).toHaveLength(9)
    expect(round.sequence[round.missing - 1]).toBeNull()
  })

  it('挑战模式会打乱剩余数字和问号', () => {
    const round = buildMissingNumberRound('shuffled', () => 0)
    const visibleNumbers = round.sequence.filter((number) => number !== null)

    expect(round.sequence).toHaveLength(9)
    expect(round.sequence.filter((number) => number === null)).toHaveLength(1)
    expect(visibleNumbers).not.toEqual(NUMBERS.filter((number) => number !== round.missing))
    expect([...visibleNumbers].sort((a, b) => a - b)).toEqual(NUMBERS.filter((number) => number !== round.missing))
  })
})

describe('missing number game', () => {
  beforeEach(() => useMissingNumberGame.getState().setMode('ordered'))

  it('答错不会推进题目，答对才完成当前题', () => {
    const state = useMissingNumberGame.getState()
    const wrongAnswer = state.options.find((number) => number !== state.missing)

    state.choose(wrongAnswer)
    expect(useMissingNumberGame.getState()).toMatchObject({ round: 1, solved: 0, mistakes: 1, feedback: 'wrong' })

    useMissingNumberGame.getState().choose(state.missing)
    expect(useMissingNumberGame.getState()).toMatchObject({ round: 1, solved: 1, feedback: 'correct' })
  })

  it('完成五题后结束游戏', () => {
    for (let round = 1; round <= TOTAL_ROUNDS; round += 1) {
      const state = useMissingNumberGame.getState()
      state.choose(state.missing)
      if (round < TOTAL_ROUNDS) useMissingNumberGame.getState().nextRound()
    }

    expect(useMissingNumberGame.getState()).toMatchObject({ solved: TOTAL_ROUNDS, feedback: 'complete', finished: true })
  })

  it('重新开始会清空答题记录', () => {
    const state = useMissingNumberGame.getState()
    state.choose(state.missing)
    useMissingNumberGame.getState().restart()

    expect(useMissingNumberGame.getState()).toMatchObject({ round: 1, solved: 0, mistakes: 0, feedback: 'ready', selected: null, finished: false })
  })

  it('切换挑战模式会开始一轮乱序的新游戏', () => {
    const state = useMissingNumberGame.getState()
    state.choose(state.missing)
    useMissingNumberGame.getState().setMode('shuffled')

    expect(useMissingNumberGame.getState()).toMatchObject({ mode: 'shuffled', round: 1, solved: 0, mistakes: 0, feedback: 'ready' })
  })
})
