// @flow
import {
  KEY_ESCAPE,
  KEY_ENTER,
  KEY_LEFT,
  KEY_RIGHT,
  KEY_SPACE
} from '../constants'
import Game from '../game'

export default function bindEvents(
  game: Game,
  escapeCallback: () => void,
  resizeCallback: () => void
) {
  window.addEventListener('resize', resizeCallback)
  window.addEventListener('keydown', e => {
    const keycode = getKeycode(e)

    if (
      [KEY_ENTER, KEY_LEFT, KEY_RIGHT, KEY_SPACE, KEY_ESCAPE].includes(keycode)
    ) {
      e.preventDefault()
    }

    if (keycode === KEY_ESCAPE) {
      escapeCallback()
    }

    game.keyDown(keycode)
  })

  window.addEventListener('keyup', e => {
    const keycode = getKeycode(e)
    game.keyUp(keycode)
  })
}

function getKeycode(e) {
  return e.which || window.event.keycode
}
