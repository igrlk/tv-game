import React from 'react'
import { connect } from 'react-redux'

import './style.css'
import Sound from '../../assets/img/Sound.png'
import SoundMuted from '../../assets/img/Sound-muted.png'

import { toggleIsSoundMuted } from '../../store/modules/app'

function SoundControls({ isSoundMuted, toggleIsSoundMuted, isIntroWasPlayed }) {
  return isIntroWasPlayed ? (
    <div onClick={toggleIsSoundMuted} className="SoundControls">
      <img
        className={!isSoundMuted ? 'd-none' : ''}
        src={SoundMuted}
        alt="Unmute"
      />
      <img className={isSoundMuted ? 'd-none' : ''} src={Sound} alt="Mute" />
    </div>
  ) : null
}

const mapStateToProps = ({ app }) => {
  return {
    isSoundMuted: app.isSoundMuted,
    isIntroWasPlayed: app.isIntroWasPlayed
  }
}

const mapDispatchToProps = {
  toggleIsSoundMuted
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SoundControls)
