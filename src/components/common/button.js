import React from 'react'

import SoundsPlayer from '../../helpers/sounds-player'

export default function Button({ children, onClick }) {
  return (
    <button
      onClick={() => {
        SoundsPlayer.play('click')
        onClick()
      }}
      onMouseOver={() => SoundsPlayer.play('hover', 0.4)}
    >
      {children}
    </button>
  )
}
