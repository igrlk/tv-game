// @flow
import PlayStage from './playing'
import Game from '../game'

import { KEY_ENTER, type keyCodeType } from '../constants'

export default class WelcomeStage {
  draw(game: Game, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, game.width, game.height)

    ctx.font = '20px "Press Start 2P"'
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'

    ctx.fillText(
      'Press [space] to start shooting!',
      game.width / 2,
      game.height / 2 - 60
    )

    ctx.fillText('Press [enter] to play!', game.width / 2, game.height / 2 - 20)

    ctx.fillText(
      'Press [esc] to quit the game!',
      game.width / 2,
      game.height / 2 + 40
    )
  }

  keyDown(game: Game, keyCode: keyCodeType) {
    if (keyCode === KEY_ENTER) {
      game.setStage(new PlayStage(game.config))
    }
  }
}
