import React from 'react'
import { connect } from 'react-redux'

import hoverAudio from '../../assets/sounds/menu/onhover.mp3'

class Button extends React.Component {
  hoverAudio = React.createRef()

  hoverHandler = () => {
    if (!this.props.isSoundMuted) {
      const hoverAudio = new Audio(this.hoverAudio.current.src)
      hoverAudio.volume = 0.4
      hoverAudio.play()
    }
  }

  render() {
    const { children, onClick } = this.props
    return (
      <React.Fragment>
        <button onClick={onClick} onMouseOver={this.hoverHandler}>
          {children}
        </button>

        <audio
          volume="0.1"
          ref={this.hoverAudio}
          src={hoverAudio}
          preload="true"
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ app }) => {
  return {
    isSoundMuted: app.isSoundMuted
  }
}

export default connect(mapStateToProps)(Button)
