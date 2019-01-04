import React from 'react'

import Cursor from './assets/Cursor.cur'

import Menu from './components/Menu/menu'
import Game from './components/Game/game'
import './App.css'

export default function App() {
  const styles = {
    cursor: `url(${Cursor}), url(http://www.example.com/bar.gif), auto`
  }

  return (
    <div style={styles}>
      <Menu />
      <Game />
    </div>
  )
}
