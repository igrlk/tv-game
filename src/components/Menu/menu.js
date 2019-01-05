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
      <React.Fragment>
        <MenuSections
          audioRef={audio}
          playOst={toggleAudioPlaying}
          currentPage={this.state.currentPage}
          changeCurrentPage={changeCurrentPage}
          history={this.props.history}
          ostIsMuted={this.state.ostIsMuted}
        />
      </React.Fragment>
    )
  }
}
