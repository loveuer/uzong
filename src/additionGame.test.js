import { beforeEach, describe, expect, it } from 'vitest'
import { ADDITION_FRUITS, ADDITION_TOTAL_ROUNDS, buildAdditionRound, useAdditionGame } from './additionGame'

describe('buildAdditionRound', () => {
  it('生成两个 1–5 的加数，且总数不超过 9', () => {
    for (const randomValue of [0, 0.2, 0.5, 0.8, 0.999]) {
      const question = buildAdditionRound(() => randomValue)

      expect(question.left).toBeGreaterThanOrEqual(1)
      expect(question.left).toBeLessThanOrEqual(5)
      expect(question.right).toBeGreaterThanOrEqual(1)
      expect(question.right).toBeLessThanOrEqual(5)
      expect(question.answer).toBe(question.left + question.right)
      expect(question.answer).toBeLessThanOrEqual(9)
      expect(ADDITION_FRUITS).toContainEqual(question.fruit)
    }
  })

  it('生成三个不重复选项并包含正确答案', () => {
    const question = buildAdditionRound(() => 0)

    expect(question.options).toHaveLength(3)
    expect(new Set(question.options).size).toBe(3)
    expect(question.options).toContain(question.answer)
  })
})

describe('addition game', () => {
  beforeEach(() => {
    useAdditionGame.setState({
      ...buildAdditionRound(() => 0),
      round: 1,
      solved: 0,
      mistakes: 0,
      feedback: 'ready',
      selected: null,
      finished: false,
    })
  })

  it('答错不会推进，答对后才能进入下一题', () => {
    const state = useAdditionGame.getState()
    const wrongAnswer = state.options.find((number) => number !== state.answer)

    state.choose(wrongAnswer)
    useAdditionGame.getState().nextRound()
    expect(useAdditionGame.getState()).toMatchObject({ round: 1, solved: 0, mistakes: 1, feedback: 'wrong' })

    useAdditionGame.getState().choose(state.answer)
    expect(useAdditionGame.getState()).toMatchObject({ round: 1, solved: 1, feedback: 'correct' })

    useAdditionGame.getState().nextRound()
    expect(useAdditionGame.getState()).toMatchObject({ round: 2, feedback: 'ready', selected: null })
  })

  it('忽略不在选项中的答案', () => {
    useAdditionGame.getState().choose(99)

    expect(useAdditionGame.getState()).toMatchObject({ solved: 0, mistakes: 0, feedback: 'ready' })
  })

  it('完成五题后结束游戏', () => {
    for (let round = 1; round <= ADDITION_TOTAL_ROUNDS; round += 1) {
      const state = useAdditionGame.getState()
      state.choose(state.answer)
      if (round < ADDITION_TOTAL_ROUNDS) useAdditionGame.getState().nextRound()
    }

    expect(useAdditionGame.getState()).toMatchObject({ solved: ADDITION_TOTAL_ROUNDS, feedback: 'complete', finished: true })
  })

  it('重新开始会清空答题记录', () => {
    const state = useAdditionGame.getState()
    state.choose(state.answer)
    useAdditionGame.getState().restart()

    expect(useAdditionGame.getState()).toMatchObject({ round: 1, solved: 0, mistakes: 0, feedback: 'ready', selected: null, finished: false })
  })
})
