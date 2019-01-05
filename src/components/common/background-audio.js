import React from 'react'
import { connect } from 'react-redux'

function BackgroundAudio({ src, audioRef, isMuted }) {
  return <audio loop muted={isMuted} ref={audioRef} src={src} preload="true" />
}

function mapStateToProps({ app }) {
  return {
    isMuted: app.isSoundMuted
  }
}

const ConnectedAudio = connect(mapStateToProps)(BackgroundAudio)

export default React.forwardRef((props, ref) => (
  <ConnectedAudio {...props} ref={ref} />
))
