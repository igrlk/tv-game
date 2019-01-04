import React from 'react'
import { connect } from 'react-redux'

import './style.css'
import Sound from '../../assets/img/Sound.png'
import SoundMuted from '../../assets/img/Sound-muted.png'

import { toggleIsSoundMuted } from '../../store/modules/app'

function SoundControls({ isSoundMuted, toggleIsSoundMuted, isIntroWasPlayed }) {
  return isIntroWasPlayed ? (
    <div className="SoundControls" onClick={toggleIsSoundMuted}>
      {isSoundMuted ? (
        <img src={SoundMuted} alt="Unmute" />
      ) : (
        <img src={Sound} alt="Mute" />
      )}
    </div>
  ) : null
}

const mapStateToProps = ({ app }) => {
  console.log(app.isIntroWasPlayed)
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
