import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

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
      <Router>
        <Switch>
          <Route path="/game" exact component={Game} />
          <Route path="/menu" exact component={Menu} />

          <Redirect to="/menu" />
        </Switch>
      </Router>
    </div>
  )
}
