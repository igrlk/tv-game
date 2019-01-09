// @flow
import PlayStage from './playing'
import Game from '../game'
import Storage from '../../../../helpers/storage'
import { getNiceScore } from '../../../../helpers/score'

import { KEY_ENTER, type keyCodeType } from '../constants'

export default class GameOverStage {
  scoreText: string

  constructor(game: Game) {
    const { success, place } = Storage.addToLeaderboards(game.score)
    if (success) {
      this.scoreText = `and the ${place} place in the leaderboards!`
    } else {
      this.scoreText = `but didn't reach in the leaderboards.`
    }
  }

  draw(game: Game, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, game.width, game.height)

    ctx.font = '30px "Press Start 2P"'
    ctx.fillStyle = '#ffffff'
    ctx.textBaseline = 'center'
    ctx.textAlign = 'center'
    ctx.fillText(
      'You almost won this game!',
      game.width / 2,
      game.height / 2 - 80
    )
    ctx.font = '20px "Press Start 2P"'
    ctx.fillText(
      'But you have to try a bit more',
      game.width / 2,
      game.height / 2 - 40
    )

    ctx.fillText(
      `You have scored ${getNiceScore(game.score)} ${this.scoreText}`,
      game.width / 2,
      game.height / 2 + 60
    )
    ctx.fillText(
      'Press [enter] to try again!',
      game.width / 2,
      game.height / 2 + 100
    )
    ctx.fillText(
      'Or press [esc] to quit the game!',
      game.width / 2,
      game.height / 2 + 140
    )
  }

  keyDown(game: Game, keyCode: keyCodeType) {
    if (keyCode === KEY_ENTER) {
      game.lives = 5
      game.score = 0
      game.setStage(new PlayStage(game.config))
    }
  }
}
