import React from 'react'

import './style.css'
import audio from '../../sounds/menu/ost-1.mp3'

import PageConfirm from './pages/confirm'
import PageIntro from './pages/intro'
import PageMain from './pages/main'
import PageLeaderboards from './pages/leaderboards'

import Storage from '../../helpers/storage'

export default class MenuSections extends React.Component {
  state = {
    username: ''
  }

  setUsername = value => {
    this.setState({
      username: Storage.setUsername(value)
    })
  }

  componentDidMount() {
    this.setState({
      username: Storage.getUsername() || 'unknown_player'
    })
  }

  render() {
    const {
      audioRef,
      onIntroStart,
      currentPage,
      changeCurrentPage
    } = this.props

    return (
      <div className="Menu" onClick={onIntroStart}>
        <audio ref={audioRef} src={audio} muted preload="true" />

        {currentPage === 0 && <PageConfirm onClick={changeCurrentPage(2)} />}
        {currentPage === 1 && <PageIntro onFinish={changeCurrentPage(2)} />}
        {currentPage === 2 && (
          <PageMain
            username={this.state.username}
            setUsername={this.setUsername}
            changeCurrentPage={changeCurrentPage}
            history={this.props.history}
          />
        )}
        {currentPage === 3 && (
          <PageLeaderboards onExit={changeCurrentPage(2)} />
        )}
      </div>
    )
  }
}
