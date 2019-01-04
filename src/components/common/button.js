import React from 'react'

import hoverAudioSrc from '../../sounds/menu/onhover.mp3'
import clickAudioSrc from '../../sounds/menu/onclick.mp3'

import Audio from './audio'

export default class Button extends React.Component {
  hoverAudio = React.createRef()
  clickAudio = React.createRef()

  clickHandler = onClick => () => {
    // this.clickAudio.current.play()
    onClick()
  }

  // hoverHandler = () => {
  //   console.log(this.hoverAudio.current.src)
  //   new Audio(this.hoverAudio.current.src).play()
  // }

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
        {/* 
        <Audio audioRef={this.hoverAudio} src={hoverAudioSrc} />
        <Audio audioRef={this.clickAudio} src={clickAudioSrc} /> */}
      </React.Fragment>
    )
  }
}
