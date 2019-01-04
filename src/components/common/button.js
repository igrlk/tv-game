import React from 'react'

import hoverAudio from '../../sounds/menu/onhover.mp3'
import clickAudio from '../../sounds/menu/onclick.mp3'

export default class Button extends React.Component {
  hoverAudio = React.createRef()
  clickAudio = React.createRef()

  clickHandler = onClick => () => {
    this.clickAudio.current.play()
    onClick()
  }

  hoverHandler = () => {
    new Audio(this.hoverAudio.current.src).play()
  }

  render() {
    const { children, onClick } = this.props
    return (
      <React.Fragment>
        <button
          onClick={this.clickHandler(onClick)}
          onMouseOver={this.hoverHandler}
        >
          {children}
        </button>

        <audio ref={this.hoverAudio} src={hoverAudio} preload="true" />
        <audio ref={this.clickAudio} src={clickAudio} preload="true" />
      </React.Fragment>
    )
  }
}
