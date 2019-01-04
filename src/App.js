import React from 'react'

import Cursor from './assets/img/Cursor.cur'

import Menu from './components/Menu/menu'
import Game from './components/Game/game'
import './App.css'

export default function App() {
  const styles = {
    cursor: `url(${Cursor}), auto`
  }

  return (
    <div style={styles}>
      <Menu />
      <Game />
    </div>
  )
}
