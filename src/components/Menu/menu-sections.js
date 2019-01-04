import React from 'react'

import './style.css'
import audio from '../../sounds/menu/ost-1.mp3'

import Confirm from './confirm'
import Intro from './intro'

export default function MenuSections({
  audioRef,
  onIntroStart,
  currentPage,
  changeCurrentPage
}) {
  return (
    <div className="Menu" onClick={onIntroStart}>
      <audio ref={audioRef} src={audio} preload="true" />

      {currentPage === 0 && <Confirm onClick={changeCurrentPage(1)} />}

      {currentPage === 1 && <Intro onFinish={changeCurrentPage(2)} />}
    </div>
  )
}
