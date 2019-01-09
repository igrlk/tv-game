import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'

import Cursor from './assets/img/Cursor.cur'
import './App.css'

import store from './store/create'
import Menu from './components/Menu/menu'
import Game from './components/Game/game'
import SoundControls from './components/SoundControls/sound-controls'
import SoundPreloader from './components/SoundPreloader/sound-preloader'

export default function App() {
  const styles = {
    cursor: `url(${Cursor}), auto`
  }

  return (
    <div style={styles}>
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Switch>
              <Route path="/game" exact component={Game} />
              <Route path="/" exact component={Menu} />

              <Redirect to="/" />
            </Switch>
            <SoundControls />
            <SoundPreloader />
          </React.Fragment>
        </Router>
      </Provider>
    </div>
  )
}
