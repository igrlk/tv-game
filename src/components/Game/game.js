import React from 'react'
import { connect } from 'react-redux'

import './style.css'
import ostSrc from '../../assets/sounds/ost/ost-1.mp3'

import init from './core/init'
import BackgroundAudio from '../common/background-audio'

class Game extends React.Component {
  audioRef = React.createRef()
  canvas = React.createRef()

  componentDidMount() {
    const { isIntroWasPlayed, history } = this.props
    if (!isIntroWasPlayed) {
      history.push('/')
    } else {
      this.audioRef.current.play()
      init(this.canvas.current, () => this.props.history.push('/'))
    }
  }

  render() {
    return (
      <div>
        <BackgroundAudio audioRef={this.audioRef} src={ostSrc} />
        <canvas ref={this.canvas} className="Game-canvas" />
      </div>
    )
  }
}

const mapStateToProps = ({ app }) => ({
  isIntroWasPlayed: app.isIntroWasPlayed
})

export default connect(mapStateToProps)(Game)
