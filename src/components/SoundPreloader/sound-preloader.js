import React from 'react'

import SoundsPlayer from '../../helpers/sounds-player'

import hover from '../../assets/sounds/menu/hover.mp3'
import click from '../../assets/sounds/menu/click.mp3'

import rocketFiring from '../../assets/sounds/game/rocket-firing.mp3'
import invaderDestroying from '../../assets/sounds/game/invader-destroying.mp3'
import shipHitting from '../../assets/sounds/game/ship-hitting.mp3'

SoundsPlayer.add('hover', hover)
SoundsPlayer.add('click', click)

SoundsPlayer.add('rocketFiring', rocketFiring)
SoundsPlayer.add('invaderDestroying', invaderDestroying)
SoundsPlayer.add('shipHitting', shipHitting)

export default function SoundPreloader() {
  return (
    <React.Fragment>
      <audio src={hover} preload="true" />
      <audio src={rocketFiring} preload="true" />
      <audio src={invaderDestroying} preload="true" />
      <audio src={shipHitting} preload="true" />
    </React.Fragment>
  )
}
