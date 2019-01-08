import React from 'react'
import { connect } from 'react-redux'

import './style.css'
import ostSrc from '../../assets/sounds/ost/ost-2.mp3'

import BackgroundAudio from '../common/background-audio'
import PageConfirm from './pages/confirm'
import PageIntro from './pages/intro'
import PageMain from './pages/main'
import PageLeaderboards from './pages/leaderboards'
import Storage from '../../helpers/storage'
import { setIntroWasPlayed } from '../../store/modules/app'

class MenuSections extends React.Component {
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
      username: Storage.getUsername()
    })

    if (this.props.isIntroWasPlayed) {
      this.props.playOst()
      this.props.changeCurrentPage(2)()
    }
  }

  closeIntro = () => {
    this.props.changeCurrentPage(2)()
    this.props.setIntroWasPlayed(true)
  }

  render() {
    const { audioRef, playOst, currentPage, changeCurrentPage } = this.props

    return (
      <div className="Menu" onClick={playOst}>
        <BackgroundAudio audioRef={audioRef} src={ostSrc} />

        {currentPage === 0 && (
          <PageConfirm
            onClick={changeCurrentPage(1)}
            onJoinAfterGame={changeCurrentPage(2)}
          />
        )}
        {currentPage === 1 && <PageIntro onFinish={this.closeIntro} />}
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

const mapStateToProps = ({ app }) => ({
  isIntroWasPlayed: app.isIntroWasPlayed
})

const mapDispatchToProps = {
  setIntroWasPlayed
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuSections)
