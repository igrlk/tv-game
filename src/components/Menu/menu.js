import React from 'react'

import MenuSections from './menu-sections'

export default class Menu extends React.Component {
  audio = React.createRef()
  state = {
    currentPage: 0
  }

  changeCurrentPage = newPage => () => {
    this.setState({
      currentPage: newPage
    })
  }

  toggleAudioPlaying = () => {
    this.audio.current.play()
  }

  render() {
    const { changeCurrentPage, audio, toggleAudioPlaying } = this
    return (
      <MenuSections
        audioRef={audio}
        onIntroStart={toggleAudioPlaying}
        currentPage={this.state.currentPage}
        changeCurrentPage={changeCurrentPage}
      />
    )
  }
}
