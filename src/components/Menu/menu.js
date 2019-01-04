import React from 'react'

import './style.css'
import audio from '../../sounds/menu/ost-1.mp3'

import Confirm from './confirm'
import Intro from './intro'

export default class Menu extends React.Component {
  state = {
    currentPage: 0
  }

  changePage = newPage => () => {
    this.setState({
      currentPage: newPage
    })
  }

  render() {
    const { changePage } = this
    return (
      <div className="Menu">
        {this.state.currentPage === 0 ? (
          <Confirm onClick={changePage(1)} />
        ) : (
          <audio autoPlay src={audio} />
        )}

        {this.state.currentPage === 1 && <Intro onFinish={changePage(2)} />}
      </div>
    )
  }
}
