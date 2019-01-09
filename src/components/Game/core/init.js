// @flow
import Game from './game'

import bindEvents from './init/bind-events'
import loadElements from './init/load-elements'

export default function init(
  canvas: HTMLCanvasElement,
  escapeCallback: () => void
) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const resizeCallback = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  const game = new Game(canvas)
  game.start()

  loadElements()

  bindEvents(game, escapeCallback, resizeCallback)
}
