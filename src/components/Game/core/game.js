// @flow
import { config } from './config'
import Stages from './stages'

export default class Game {
  gameCanvas: HTMLCanvasElement
  width: number
  height: number
  gameBounds: {
    left: number,
    right: number,
    top: number,
    bottom: number
  }

  lives: number
  score: number
  level: number
  ship: null

  currentStage = null
  config = config
  pressedKeys = {}

  constructor(gameCanvas: HTMLCanvasElement) {
    this.gameCanvas = gameCanvas

    const { width, height } = gameCanvas
    this.width = width
    this.height = height

    const { widthDiff, heightDiff } = this.config
    this.gameBounds = {
      left: width / 2 - widthDiff,
      right: width / 2 + widthDiff,
      top: height / 2 - heightDiff,
      bottom: height / 2 + heightDiff
    }
  }

  start() {
    this.setStage(new Stages.Welcome())

    this.lives = 5
    this.score = 0
    this.level = 1

    this.loop()
  }

  setStage(stage: any) {
    const { currentStage } = this
    if (currentStage && currentStage.leave) {
      currentStage.leave(this)
      this.currentStage = null
    }

    if (stage.enter) {
      stage.enter(this)
    }

    this.currentStage = stage
  }

  loop() {
    const currentStage = this.currentStage
    if (currentStage) {
      const dt = 1 / this.config.fps

      const ctx = this.gameCanvas.getContext('2d')

      if (currentStage.update) {
        currentStage.update(this, dt)
      }
      if (currentStage.draw) {
        currentStage.draw(this, ctx)
      }
    }

    requestAnimationFrame(() => this.loop())
  }

  keyDown(keyCode: number) {
    this.pressedKeys[keyCode] = true

    this.triggerCallbackIfCurrentStageHas('keyDown', keyCode)
  }

  keyUp(keyCode: number) {
    this.pressedKeys[keyCode] = false

    this.triggerCallbackIfCurrentStageHas('keyUp', keyCode)
  }

  triggerCallbackIfCurrentStageHas(key: 'keyDown' | 'keyUp', keyCode: number) {
    const currentStage = this.currentStage
    if (currentStage && currentStage[key]) {
      currentStage[key](this, keyCode)
    }
  }
}
