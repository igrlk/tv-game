import React from 'react'

import './style.css'

export default function Game({ history }) {
  return (
    <div>
      <div className="Game">Game</div>
      <div className="Game" onClick={() => history.push('/')}>
        back to main menu
      </div>
    </div>
  )
}
