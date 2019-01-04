import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { Provider } from 'react-redux'

import Cursor from './assets/img/Cursor.cur'
import './App.css'

import store from './store/create'
import Menu from './components/Menu/menu'
import Game from './components/Game/game'

export default function App() {
  const styles = {
    cursor: `url(${Cursor}), auto`
  }

  return (
    <div style={styles}>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/game" exact component={Game} />
            <Route path="/menu" exact component={Menu} />

            <Redirect to="/menu" />
          </Switch>
        </Router>
      </Provider>
    </div>
  )
}
